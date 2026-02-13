import orderModel from "../models/orderModel.js";

const addOrder = async (req, res) => {
  try {
    const {
      order
    } = req.body;

    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order",
      });
    }

    const doc = await orderModel.create({
      userId: req.user?._id || null,
      userName: req.user?.name || "Guest",
      userEmail: req.user?.email || "N/A",
      items: order.items,
      total: order.total ||
        order.items.reduce(
          (sum, it) => sum + Number(it.price) * Number(it.quantity),
          0
        ),
      date: order.date || Date.now(),
      status: "Placed",
    });

    res.status(201).json({
      success: true,
      order: doc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserOrders = async (req, res) => {
  try {
    // get user id (token > query)
    const userId = req.user?._id || req.query.userId || null;

    if (!userId) {
      return res.status(200).json({
        success: true,
        orders: []
      });
    }

    const orders = await orderModel.find({
      userId
    }).sort({
      date: -1
    });
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    // find order
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // update status
    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  addOrder,
  getUserOrders,
  cancelOrder
};