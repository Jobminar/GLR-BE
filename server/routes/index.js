import { Router } from "express";
const router = Router();

import { login, verifyOTP, signUp } from "../controllers/userController.js";

// Login route
router.post("/user/login", login);

// Optional OTP verification route
router.post("/user/verify-otp", verifyOTP);

// Signup route
router.post("/user/signup", signUp);

export default router;
