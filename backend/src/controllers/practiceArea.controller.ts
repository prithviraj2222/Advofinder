import { type Request, type Response, type NextFunction } from "express";
import {
  createPracticeAreaSchema,
  practiceAreaQuerySchema,
  updatePracticeAreaSchema,
} from "../validations/practiceArea.validation.js";
import {
  createPracticeArea,
  deletePracticeArea,
  getAllPracticeAreas,
  updatePracticeArea,
} from "../services/practiceArea.service.js";

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

export const editPracticeArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const validatedData = updatePracticeAreaSchema.parse(req.body);

    const result = await updatePracticeArea(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Practice area updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removePracticeArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const result = await deletePracticeArea(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllPracticeArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = practiceAreaQuerySchema.parse(req.query);

    const result = await getAllPracticeAreas(validatedData);

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
