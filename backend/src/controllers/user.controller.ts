import { type Request, type Response, type NextFunction } from "express";
import { getUserDetails, updateUserDetails } from "../services/user.service.js";
import { updateUserSchema } from "../validations/user.validation.js";

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserDetails(req.user.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);

    const user = await updateUserDetails(req.user.id, validatedData);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
