import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  phoneNumber: z.string().regex(/^[0-9]{10}$/).optional(),
});

export type RegisterData = z.infer<typeof registerSchema>;
