import express from "express";
import { login, signUp, verifyOTP } from "../controllers/userController.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", signUp);
router.post("/user/verify-otp", verifyOTP);

export default router;
