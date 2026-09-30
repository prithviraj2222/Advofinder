import { type Request, type Response, type NextFunction } from "express";
import { createPracticeAreaSchema } from "../validations/practiceArea.validation.js";
import { createPracticeArea } from "../services/practiceArea.service.js";

export const createNewPracticeArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createPracticeAreaSchema.parse(req.body);

    const result = await createPracticeArea(validatedData);

    return res.status(201).json({
      success: true,
      message: "Practice are created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
