import { z } from "zod";

export const createPracticeAreaSchema = z.object({
  name: z.string().trim().min(2),
});

export const updatePracticeAreaSchema = z.object({
  name: z.string().trim().min(2).optional(),
});

export const practiceAreaQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().trim().optional(),
  sortBy: z.enum(["name", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type CreatePracticeAreaData = z.infer<typeof createPracticeAreaSchema>;
export type UpdatePracticeAreaData = z.infer<typeof updatePracticeAreaSchema>;
export type PracticeAreaQueryData = z.infer<typeof practiceAreaQuerySchema>;