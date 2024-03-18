import express from "express";
import { login, signUp, verifyOTP } from "../controllers/userController.js";
import courseController from "../controllers/courseController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();
//user routes
router.post("/user/login", login);
router.post("/user/signup", signUp);
router.post("/user/verify-otp", verifyOTP);
//course controller
router.get("/course", courseController.getAllCourses);
router.post("/course", courseController.createCourse);
router.get("/course/:id", courseController.getCourseById);

//cart controller routes
router.get("/carts/:userId", cartController.getCartByUserId);
router.post("/carts/:userId/add", cartController.addToCart);
//order controller
router.get("/orders", orderController.getAllOrders);
router.post("/orders", orderController.createOrder);
export default router;
