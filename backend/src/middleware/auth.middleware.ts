import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not found", 401);
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new AppError("Invalid authorization format", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: number;
      role: string;
    };

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

export default authMiddleware;
