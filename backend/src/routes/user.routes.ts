import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileImage,
} from "../controllers/user.controller.js";
import uploadMiddleware from "../middleware/upload.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getUserProfile);
router.patch("/me", authMiddleware, updateUserProfile);
router.patch("/me/profile-image",authMiddleware, uploadMiddleware.single("profileImage"), updateUserProfileImage);

export default router;
