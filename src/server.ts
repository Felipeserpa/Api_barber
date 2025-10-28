import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

// Middleware de erro corrigido
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(400).json({
      error: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
  return;
};

app.use(errorHandler);

app.listen(3333, () => console.log("SERVER ONLINE :)"));
