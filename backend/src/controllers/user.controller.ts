import { type Request, type Response, type NextFunction } from "express";
import { getUserDetails, updateProfileImage, updateUserDetails } from "../services/user.service.js";
import { updateUserSchema } from "../validations/user.validation.js";
import AppError from "../utils/AppError.js";

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
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      throw new AppError("Profile image is required", 400);
    }

    const filePath = `/uploads/${req.file.filename}`;

    const user = await updateProfileImage(req.user.id, filePath);

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: {
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};