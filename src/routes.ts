import { Router } from "express"; // Não precisamos mais do RequestHandler aqui

// --- Middlewares ---
// Presumo que 'AuthMiddleware' é o seu middleware de autenticação
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

// --- Usuários (User) ---
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// --- Cortes de Cabelo (Haircut) ---
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./controllers/haircut/CkeckSubscriptionControlle";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

// --- Serviços/Agendamentos (Service/Schedule) ---
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

// --- Outros ---
import { UpdateUserController } from "./controllers/user/UpdateUserController";

const router = Router();

// --- Rotas de Usuário ---
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/detail", AuthMiddleware, new DetailUserController().handle);
router.put("/users", AuthMiddleware, new UpdateUserController().handle);

// --- Rotas de Corte de Cabelo (Haircut) ---
router.post("/haircut", AuthMiddleware, new CreateHaircutController().handle);
router.get("/haircuts", AuthMiddleware, new ListHaircutController().handle);
router.put(
  "/haircut",
  AuthMiddleware,
  new UpdateHaircutController().handle // ERRO TS2769: CORRIGIDO AO USAR EXPRESS-ASYNC-ERRORS E REMOVER AS REQUESTHANDLER
);
router.get(
  "/haircut/check",
  AuthMiddleware,
  new CheckSubscriptionController().handle
);
router.get(
  "/haircut/detail",
  AuthMiddleware,
  new CountHaircutsController().handle
);
router.delete("/haircut", AuthMiddleware, new DetailHaircutController().handle);

// --- Rotas de Serviço/Agendamento (Schedule) ---
router.post(
  "/schedule",
  AuthMiddleware,
  new NewScheduleController().handle // ERRO TS2769: CORRIGIDO AO USAR EXPRESS-ASYNC-ERRORS E REMOVER AS REQUESTHANDLER
);
router.get("/schedule", AuthMiddleware, new ListScheduleController().handle);
router.put(
  "/schedule/finish",
  AuthMiddleware,
  new FinishScheduleController().handle
);

export { router };
