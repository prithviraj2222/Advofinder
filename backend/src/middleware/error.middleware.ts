import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../utils/AppError.js";

const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues,
        });
    }

    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;