import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { createNewPracticeArea, editPracticeArea, fetchAllPracticeArea, removePracticeArea } from "../controllers/practiceArea.controller.js";

const router = Router();

router.get("/", fetchAllPracticeArea);
router.post("/", authMiddleware, createNewPracticeArea);
router.patch("/:id", authMiddleware, editPracticeArea);
router.delete("/:id", authMiddleware, removePracticeArea);

export default router;
