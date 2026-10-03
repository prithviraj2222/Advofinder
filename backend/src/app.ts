import express, { type Express, type Request, type Response } from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import lawyerRoutes from "./routes/lawyer.routes.js";
import practiceAreaRoutes from "./routes/practiceArea.routes.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/practice-areas", practiceAreaRoutes);
app.use("/uploads", express.static("src/uploads"));

app.use(errorMiddleware);

export default app;
