import express from "express";
import { login, signUp, verifyOTP } from "../controllers/userController.js";
import courseController from "../controllers/courseController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";
import careerController from "../controllers/careerController.js";
import blogController from "../controllers/blogController.js";
import contactController from "../controllers/contactController.js";

const router = express.Router();
//user routes
router.post("/user/login", login);
router.post("/user/signup", signUp);
router.post("/user/verify-otp", verifyOTP);
//course controller
router.get("/getcourse", courseController.getAllCourses);
router.post("/postcourse", courseController.createCourse);
router.get("/course/:id", courseController.getCourse);

//cart controller routes
router.get("/carts/:userId", cartController.getCartByUserId);
router.post("/carts/:userId/add", cartController.addToCart);
//order controller
router.get("/orders", orderController.getAllOrders);
router.post("/orders", orderController.createOrder);

router.post("/postcareer", careerController.createCareer);
router.get("/getcareer", careerController.getAllCareers);

router.post("/postcontact", contactController.createContact);
router.get("/getcontact", contactController.getAllContact);
//blogrouters
router.post("/blog", blogController.createBlog);
router.get("/blog", blogController.getAllBlogs);
export default router;
