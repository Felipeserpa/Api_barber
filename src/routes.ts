import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

//rotas dos cortes e preco
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/updateHaircutController";
import { CheckSubscriptionController } from "./controllers/haircut/CkeckSubscriptionControlle";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

//Rotas de agendamentos do cliente
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// --- ROTAS USER ---
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

//---ROTAS DOS CORTES
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);
//    rotas para saber se o usuario tem uma assinatura
router.get(
  "/haircuts/check",
  isAuthenticated,
  new CheckSubscriptionController().handle
);
//rotas para contagem de cortes e preco total de cortes em aberto e fechados
router.get(
  "/haircuts/count",
  isAuthenticated,
  new CountHaircutsController().handle
);
//rota para detalhar um corte
router.get(
  "/haircut/detail",
  isAuthenticated,
  new DetailHaircutController().handle
);

//---ROTAS DOS AGENDAMENTOS
router.post("/schedule", isAuthenticated, new NewScheduleController().handle);

export { router };
