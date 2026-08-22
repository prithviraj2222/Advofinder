import { Router } from "express";
import {
  sendOtp,
  register,
  verifyOtp,
  registerLawyer,
  login,
  regenerateAccessToken,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register-user", register);
router.post("/register-advocate", registerLawyer);
router.post("/login", login);
router.post("/refresh-token", regenerateAccessToken);

router.get(
  "/test-auth",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Authentication successful",
      user: req.user,
    });
  },
);

export default router;
