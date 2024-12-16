import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    contact: { type: String, required: true },
    items: [
      {
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
  });

  const Order=mongoose.model("Order", OrderSchema);
  export default Order;