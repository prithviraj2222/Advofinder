import {z} from "zod";

export const verifyOtpSchema = z.object({
    email: z.email(),
    otp: z.string().length(6).regex(/^\d{6}$/),
});

export type OtpData = z.infer<typeof verifyOtpSchema>;