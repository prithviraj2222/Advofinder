import { type Request, type Response, type NextFunction } from "express";
import AppError from "../utils/AppError.js";

const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Access denied", 403);
    }

    next();
  };
};

export default authorize;