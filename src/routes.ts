import { Router, Request, Response, NextFunction } from "express";

// --- Middlewares ---
import { isAuthenticated } from "./middlewares/isAuthenticated";

// --- Usuários (User) ---
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { UpdateUserController } from "./Controllers/User/UpdateUserController";

// --- Cortes de Cabelo (Haircut) ---
import { CreateHaircutController } from "./Controllers/Haircut/CreateHaircutController";
import { ListHaircutController } from "./Controllers/Haircut/ListHaircutController";
import { UpdateHaircutController } from "./Controllers/Haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./Controllers/Haircut/CkeckSubscriptionController";
import { CountHaircutsController } from "./Controllers/Haircut/CountHaircutsController";
import { DetailHaircutController } from "./Controllers/Haircut/DetailHaircutController";

// --- Serviços/Agendamentos (Schedule) ---
import { NewScheduleController } from "./Controllers/Schedule/NewScheduleController";
import { ListScheduleController } from "./Controllers/Schedule/ListScheduleController";
import { FinishScheduleController } from "./Controllers/Schedule/FinishScheduleController";

const router = Router();

/**
 * ✅ Função que converte qualquer controller em um middleware Express válido
 * (resolve o problema de tipagem com TypeScript)
 */
const controllerHandler = (controller: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await controller.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// --- Rotas de Usuário ---
router.post("/users", controllerHandler(new CreateUserController()));
router.post("/session", controllerHandler(new AuthUserController()));
router.get(
  "/detail",
  isAuthenticated,
  controllerHandler(new DetailUserController())
);
router.put(
  "/users",
  isAuthenticated,
  controllerHandler(new UpdateUserController())
);

// --- Rotas de Corte de Cabelo (Haircut) ---
router.post(
  "/haircut",
  isAuthenticated,
  controllerHandler(new CreateHaircutController())
);
router.get(
  "/haircuts",
  isAuthenticated,
  controllerHandler(new ListHaircutController())
);
router.put(
  "/haircut",
  isAuthenticated,
  controllerHandler(new UpdateHaircutController())
);
router.get(
  "/haircut/check",
  isAuthenticated,
  controllerHandler(new CheckSubscriptionController())
);
router.get(
  "/haircut/detail",
  isAuthenticated,
  controllerHandler(new CountHaircutsController())
);
router.delete(
  "/haircut",
  isAuthenticated,
  controllerHandler(new DetailHaircutController())
);

// --- Rotas de Serviço/Agendamento (Schedule) ---
router.post(
  "/schedule",
  isAuthenticated,
  controllerHandler(new NewScheduleController())
);
router.get(
  "/schedule",
  isAuthenticated,
  controllerHandler(new ListScheduleController())
);
router.put(
  "/schedule/finish",
  isAuthenticated,
  controllerHandler(new FinishScheduleController())
);

export { router };
