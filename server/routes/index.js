import express from "express";
import { login, signUp, verifyOTP } from "../controllers/userController.js";
import blogsController from "../controllers/blogsController.js";
import careerController from "../controllers/careerController.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", signUp);
router.post("/user/verify-otp", verifyOTP);

router.post("/postblogs",blogsController.createBlogs)
router.get("/getblogs",blogsController.getAllBlogs)

router.post("/postcareer",careerController.createCareer)
router.get("/getcareer",careerController.getAllCareer)

export default router;
