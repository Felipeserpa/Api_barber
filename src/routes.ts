import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

//router.get("/teste", (req: Request, res: Response) => {
//return res.json({ ok: "true" });
//});

// --Rotas User --

router.post("/users", (req: Request, res: Response) => {
  return new CreateUserController().handle(req, res);
});
export { router };
