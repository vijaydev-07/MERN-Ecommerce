import orderModel from "../models/orderModel.js";

/**
 * ADD ORDER
 * expects JSON body { order: { items: [...], total, userId? } }
 */
const addOrder = async (req, res) => {
  try {
    const { order } = req.body;
    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order" });
    }
    const doc = await orderModel.create({
      userId: order.userId || (req.user && req.user._id) || null,
      items: order.items,
      total: order.total || order.items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0),
      date: order.date || Date.now(),
      status: "Placed",
    });
    res.status(201).json({ success: true, order: doc });
  } catch (error) {
    console.error("Add order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET ORDERS FOR LOGGED IN USER
 * If auth unavailable, returns orders filtered by userId param or all orders saved locally not supported here.
 */
const getUserOrders = async (req, res) => {
  try {
    const tokenUserId = req.user && req.user._id;
    const userId = tokenUserId || req.query.userId || null;
    if (!userId) {
      // If no user id, return empty array (frontend uses localStorage fallback)
      return res.status(200).json({ success: true, orders: [] });
    }
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * CANCEL ORDER
 * PATCH /api/order/:id/cancel
 */
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.status = "Cancelled";
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addOrder, getUserOrders, cancelOrder };
