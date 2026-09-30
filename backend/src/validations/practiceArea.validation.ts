import { z } from "zod";

export const createPracticeAreaSchema = z.object({
  name: z.string().trim().min(2),
});

export const updatePracticeAreaSchema = z.object({
  name: z.string().trim().min(2).optional(),
});

export type CreatePracticeAreaData = z.infer<typeof createPracticeAreaSchema>;
export type UpdatePracticeAreaData = z.infer<typeof updatePracticeAreaSchema>;
