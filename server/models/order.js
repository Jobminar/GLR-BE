import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
