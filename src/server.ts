import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(router);

// Middleware de erro (compatível TS 5.7+)
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Porta dinâmica para Vercel
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`SERVER ONLINE na porta ${PORT}`));
