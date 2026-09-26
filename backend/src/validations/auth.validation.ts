import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.email().trim(),
  password: z.string().trim().min(8),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/)
    .optional(),
});

export const advocateRegisterSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.email().trim(),
  password: z.string().trim().min(8),
  phoneNumber: z.string().regex(/^[0-9]{10}$/),
  barCouncilNumber: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  country: z.string().trim().min(1),
  pincode: z.string().regex(/^[0-9]{6}$/),
});

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.email().trim(),
});

export const resetPasswordSchema = z.object({
  email: z.email().trim(),
  newPassword: z.string().trim().min(8),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const changePasswordSchema = z.object({
  newPassword: z.string().trim().min(8),
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type AdvocateData = z.infer<typeof advocateRegisterSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPassData = z.infer<typeof forgotPasswordSchema>;
export type ResetPassData = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenData = z.infer<typeof refreshTokenSchema>;
