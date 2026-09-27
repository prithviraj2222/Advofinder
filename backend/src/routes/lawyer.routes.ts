import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getLawyerAllData,
  getLawyerProfile,
  updateLawyerProfile,
} from "../controllers/lawyer.controller.js";

const router = Router();

router.get("/me", authMiddleware, getLawyerProfile);
router.patch("/me", authMiddleware, updateLawyerProfile);
router.get("/:id", getLawyerAllData);

export default router;
