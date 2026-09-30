import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { createNewPracticeArea } from "../controllers/practiceArea.controller.js";

const router = Router();

router.post("/", authMiddleware, createNewPracticeArea);

export default router;
