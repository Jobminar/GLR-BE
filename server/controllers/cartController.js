import Cart from "../models/cart.js";

export default {
  getCartByUserId: async (req, res) => {
    const userId = req.params.userId;
    try {
      const cart = await Cart.findOne({ userId }).populate("coursesId");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addToCart: async (req, res) => {
    const userId = req.params.userId;
    const courseId = req.body.courseId;
    try {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({
          userId,
          cartId: Math.random().toString(36).substring(2, 15), // Generate unique cartId
        });
      }
      const courseExists = cart.coursesId.some(
        (course) => course._id.toString() === courseId
      );
      if (courseExists) {
        return res
          .status(400)
          .json({ message: "Course already exists in cart" });
      }
      cart.coursesId.push(courseId);
      await cart.save();
      res.status(201).json({ message: "Course added to cart" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
