import { Router } from "express"; // Não precisamos mais do RequestHandler aqui

// --- Middlewares ---
// Presumo que 'AuthMiddleware' é o seu middleware de autenticação
import { isAuthenticated } from "./middlewares/isAuthenticated";

// --- Usuários (User) ---
import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";

// --- Cortes de Cabelo (Haircut) ---
import { CreateHaircutController } from "./controllers/Haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/Haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/Haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./controllers/Haircut/CkeckSubscriptionControlle";
import { CountHaircutsController } from "./controllers/Haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/Haircut/DetailHaircutController";

// --- Serviços/Agendamentos (Service/Schedule) ---
import { NewScheduleController } from "./controllers/Schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/Schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/Schedule/FinishScheduleController";

// --- Outros ---
import { UpdateUserController } from "./controllers/User/UpdateUserController";

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
