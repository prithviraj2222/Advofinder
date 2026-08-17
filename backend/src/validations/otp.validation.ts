import {z} from "zod";

export const storeOtpSchema = z.object({
    userId: z.int(),
    otp: z.string().length(6),
    expiresAt: z.ZodISODateTime,
});