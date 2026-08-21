import { type Request, type Response, type NextFunction } from "express";
import { registerSchema } from "../validations/auth.validation.js";
import { registerUser, sendRegistrationOtp } from "../services/auth.service.js";
import { verifyOtpSchema } from "../validations/otp.validation.js";
import { verifyRegistrationOtp } from "../services/otp.service.js";

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const result = await sendRegistrationOtp(email);

    return res.status(200).json(result);
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    next(error);
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = verifyOtpSchema.parse(req.body);

        const result = await verifyRegistrationOtp(validatedData);

        return res.status(200).json(result);
    } catch (error) {
        next(error);    
    }
}

export const register = async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);

  const user = await registerUser(validatedData);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};
