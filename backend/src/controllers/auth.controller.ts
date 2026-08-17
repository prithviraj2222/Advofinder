import { type Request, type Response } from "express";
import { registerSchema } from "../validations/auth.validation.js";
import { registerUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    })
    
}
