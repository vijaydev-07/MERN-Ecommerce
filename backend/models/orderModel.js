import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // optional if no auth
  items: [
    {
      productId: { type: String, required: true },
      size: { type: String, required: false },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Placed" }, // Placed, Cancelled
  date: { type: Number, default: Date.now },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
