import { Router } from "express";
import { sendOtp, register, verifyOtp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", register);

export default router;