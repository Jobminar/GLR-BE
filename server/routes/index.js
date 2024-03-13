import { Router } from "express";
const router = Router();

import { login, verifyOTP, signUp } from "../controllers/userController.js";

// Login route
router.post("/login", login);

// Optional OTP verification route
router.post("/verify-otp", verifyOTP);

// Signup route
router.post("/signup", signUp);

export default router;
