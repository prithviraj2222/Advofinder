import { type Request, type Response, type NextFunction } from "express";
import {
  advocateRegisterSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/auth.validation.js";
import {
  changePassword,
  forgotPassword,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerAdvocate,
  registerUser,
  resetPassword,
  sendRegistrationOtp,
} from "../services/auth.service.js";
import { verifyOtpSchema } from "../validations/otp.validation.js";
import { verifyotp } from "../services/otp.service.js";

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const result = await sendRegistrationOtp(email);

    return res.status(200).json(result);
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = verifyOtpSchema.parse(req.body);

    const result = await verifyotp(validatedData);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const registerLawyer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = advocateRegisterSchema.parse(req.body);

    const user = await registerAdvocate(validatedData);

    return res.status(201).json({
      success: true,
      message: "Advocate registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const regenerateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = refreshTokenSchema.parse(req.body);

    const result = await refreshAccessToken(validatedData);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = refreshTokenSchema.parse(req.body);

    await logOutUser(validatedData.refreshToken);

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = forgotPasswordSchema.parse(req.body);

    const result = await forgotPassword(validatedData);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = resetPasswordSchema.parse(req.body);

    const result = await resetPassword(validatedData);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const changePass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body);
    const result = await changePassword(req.user.id, validatedData.newPassword);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error)
  }
}