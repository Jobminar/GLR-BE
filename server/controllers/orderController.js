import Order from "../models/order.js";

export default {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate("courses userId"); // Populate courses and user data
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createOrder: async (req, res) => {
    const { userId, courses, totalPrice } = req.body;
    if (!userId || !courses || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const order = new Order({
        orderId: Math.random().toString(36).substring(2, 15),
        userId,
        courses,
        totalPrice,
      }); // Generate unique orderId
      await order.save();
      res.status(201).json({ message: "Order created successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
