import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authMiddleware, getUserProfile);
router.patch("/me", authMiddleware, updateUserProfile);

export default router;
