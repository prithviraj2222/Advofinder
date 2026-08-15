import express, { type Express, type Request, type Response } from "express";
import errorMiddleware from "./middleware/error.middleware.js"; 

const app: Express = express();

app.get("/", (req: Request, res: Response) : void => {
  res.send("AdvoFinder Backend Running 🚀");
});

app.use(errorMiddleware);

export default app;