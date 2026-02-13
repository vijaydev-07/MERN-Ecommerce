import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  userName: {
    type: String
  },
  userEmail: {
    type: String
  },
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Placed"
  },
  date: {
    type: Number,
    required: true
  },
  address: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    mobile: String,
  }

});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;