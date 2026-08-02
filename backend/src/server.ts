import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, (): void => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});