import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(2).optional(),
  lastName: z.string().trim().min(2).optional(),
  phoneNumber: z.string().regex(/^[0-9]{10}$/).optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;