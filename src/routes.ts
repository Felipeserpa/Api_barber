import { Router, Request, Response, NextFunction } from "express";

// Controllers Usuário
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

// Controllers Haircut
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

// Controllers Schedule
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

// Middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// 🔧 Função para ignorar o tipo de retorno do controller
const wrap =
  (controller: any) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(controller.handle(req, res, next)).catch(next);
  };

// --- USERS ---
router.post("/users", wrap(new CreateUserController()));
router.post("/session", wrap(new AuthUserController()));
router.get("/me", isAuthenticated, wrap(new DetailUserController()));
router.put("/users", isAuthenticated, wrap(new UpdateUserController()));

// --- HAIRCUTS ---
router.post("/haircut", isAuthenticated, wrap(new CreateHaircutController()));
router.get("/haircuts", isAuthenticated, wrap(new ListHaircutController()));
router.put("/haircut", isAuthenticated, wrap(new UpdateHaircutController()));
router.get(
  "/haircuts/count",
  isAuthenticated,
  wrap(new CountHaircutsController())
);
router.get(
  "/haircut/detail",
  isAuthenticated,
  wrap(new DetailHaircutController())
);

// --- SCHEDULES ---
router.post("/schedule", isAuthenticated, wrap(new NewScheduleController()));
router.get("/schedule", isAuthenticated, wrap(new ListScheduleController()));
router.delete(
  "/schedule",
  isAuthenticated,
  wrap(new FinishScheduleController())
);

export { router };
