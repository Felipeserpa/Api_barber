import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

//router.get("/teste", (req: Request, res: Response) => {
//return res.json({ ok: "true" });
//});

// --Rotas USer --

router.post("/user", new CreateUserController().handle);

export { router };
