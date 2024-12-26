import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

// --Rotas User --
//rota de cadastro
router.post("/users", (req: Request, res: Response) => {
  return new CreateUserController().handle(req, res);
});
//rota de login
router.post("/session", (req: Request, res: Response) => {
  return new AuthUserController().handle(req, res);
});

export { router };
