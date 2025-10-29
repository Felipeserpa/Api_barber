import { Router } from "express"; // Não precisamos mais do RequestHandler aqui

// --- Middlewares ---
// Presumo que 'AuthMiddleware' é o seu middleware de autenticação
import { isAuthenticated } from "./Middlewares/isAuthenticated";

// --- Usuários (User) ---
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { DetailUserController } from "./Controllers/User/DetailUserController";

// --- Cortes de Cabelo (Haircut) ---
import { CreateHaircutController } from "./Controllers/Haircut/CreateHaircutController";
import { ListHaircutController } from "./Controllers/Haircut/ListHaircutController";
import { UpdateHaircutController } from "./Controllers/Haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./controllers/Haircut/CkeckSubscriptionController";

import { CountHaircutsController } from "./Controllers/Haircut/CountHaircutsController";
import { DetailHaircutController } from "./Controllers/Haircut/DetailHaircutController";

// --- Serviços/Agendamentos (Service/Schedule) ---
import { NewScheduleController } from "./Controllers/Schedule/NewScheduleController";
import { ListScheduleController } from "./Controllers/Schedule/ListScheduleController";
import { FinishScheduleController } from "./Controllers/Schedule/FinishScheduleController";

// --- Outros ---
import { UpdateUserController } from "./Controllers/User/UpdateUserController";

const router = Router();

// --- Rotas de Usuário ---
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/detail", isAuthenticated, new DetailUserController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// --- Rotas de Corte de Cabelo (Haircut) ---
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);
router.put(
  "/haircut",
  isAuthenticated,
  new UpdateHaircutController().handle // ERRO TS2769: CORRIGIDO AO USAR EXPRESS-ASYNC-ERRORS E REMOVER AS REQUESTHANDLER
);
router.get(
  "/haircut/check",
  isAuthenticated,
  new CheckSubscriptionController().handle
);
router.get(
  "/haircut/detail",
  isAuthenticated,
  new CountHaircutsController().handle
);
router.delete(
  "/haircut",
  isAuthenticated,
  new DetailHaircutController().handle
);

// --- Rotas de Serviço/Agendamento (Schedule) ---
router.post(
  "/schedule",
  isAuthenticated,
  new NewScheduleController().handle // ERRO TS2769: CORRIGIDO AO USAR EXPRESS-ASYNC-ERRORS E REMOVER AS REQUESTHANDLER
);
router.get("/schedule", isAuthenticated, new ListScheduleController().handle);
router.put(
  "/schedule/finish",
  isAuthenticated,
  new FinishScheduleController().handle
);

export { router };
