import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Middleware de erro
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res
    .status(500)
    .json({ status: "error", message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
