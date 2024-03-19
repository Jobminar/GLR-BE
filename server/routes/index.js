import express from "express";
import { login, signUp, verifyOTP } from "../controllers/userController.js";
import courseController from "../controllers/courseController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";
import blogsController from "../controllers/blogsController.js";
import careerController from "../controllers/careerController.js";
import contactController from "../controllers/contactController.js";

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
router.post("/postblogs",blogsController.createBlogs)
router.get("/getblogs",blogsController.getAllBlogs)

router.post("/postcareer",careerController.createCareer)
router.get("/getcareer",careerController.getAllCareer)

router.post("/postcontact",contactController.createContact)
router.get("/getcontact",contactController.getAllContact)

export default router;
