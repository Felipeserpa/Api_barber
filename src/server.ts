import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);
//implementando cors
app.use(cors());

//implementando o middleware de erro
app.user((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => {
  console.log("serviço online");
});
