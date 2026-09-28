import { type Request, type Response, type NextFunction } from "express";
import {
  getAllLawyersDetails,
  getLawyerData,
  getLawyerDetails,
  updateLawyerDetails,
} from "../services/lawyer.service.js";
import { lawyerQuerySchema, updateLawyerSchema } from "../validations/lawyer.validation.js";

export const getLawyerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let lawyer = await getLawyerDetails(req.user.id);

    return res.status(200).json({
      success: true,
      data: lawyer,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLawyerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = updateLawyerSchema.parse(req.body);

    const lawyer = await updateLawyerDetails(req.user.id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Lawyer profile updated successfully",
      data: lawyer,
    });
  } catch (error) {
    next(error);
  }
};

export const getLawyerAllData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const lawyer = await getLawyerData(id);

    return res.status(200).json({
      success: true,
      message: "Lawyer profile updated successfully",
      data: lawyer,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLawyer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = lawyerQuerySchema.parse(req.query);

    const result = await getAllLawyersDetails(validatedData);

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error)
  }
}