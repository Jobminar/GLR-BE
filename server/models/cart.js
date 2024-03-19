import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  cartId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coursesId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
});

export default model("Cart", cartSchema);
