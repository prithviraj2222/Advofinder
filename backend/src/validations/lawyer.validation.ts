import { z } from "zod";
import { updateUserSchema } from "./user.validation.js";

export const updateLawyerSchema = updateUserSchema.extend({
  experience: z.number().int().min(0).optional(),
  consultationFee: z.number().min(0).optional(),
  bio: z.string().trim().optional(),
  officeAddress: z.string().trim().optional(),
  city: z.string().trim().min(1).optional(),
  state: z.string().trim().min(1).optional(),
  country: z.string().trim().min(1).optional(),
  pincode: z.string().regex(/^[0-9]{6}$/).optional(),
});

export const lawyerQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).optional(),

  search: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),

  experience: z.coerce.number().min(0).optional(),
  consultationFee: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),

  sortBy: z
    .enum(["experience", "consultationFee", "rating"])
    .optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type LawyerQueryData = z.infer<typeof lawyerQuerySchema>;
export type UpdateLawyerData = z.infer<typeof updateLawyerSchema>;