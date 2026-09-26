import { Router } from "express";
import {
  sendOtp,
  register,
  verifyOtp,
  registerLawyer,
  login,
  regenerateAccessToken,
  logout,
  forgotPass,
  resetPass,
  changePass,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register-user", register);
router.post("/register-advocate", registerLawyer);
router.post("/login", login);
router.post("/refresh-token", regenerateAccessToken);
router.post("/logout", logout);
router.post("/forgot-pass", forgotPass);
router.post("/reset-pass", resetPass);
router.post("/change-pass", authMiddleware, changePass);

export default router;
