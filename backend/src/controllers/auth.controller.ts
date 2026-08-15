import { type Request, type Response } from "express";
import { registerSchema } from "../validations/auth.validation.js";

const register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);
    const {firstName, lastName, email, password, phoneNumber} = validatedData;


}
