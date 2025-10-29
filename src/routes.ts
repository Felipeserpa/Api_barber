import { Router, Request, Response, NextFunction } from "express";

// Controllers Usuário
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

// Controllers Haircut
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController"; // 👈 corrigido para minúsculo
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

// Controllers Schedule
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

// Middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Função que adapta controllers para Express
const asyncHandler =
  (controller: any): RequestHandler =>
  async (req, res, next) => {
    try {
      await Promise.resolve(controller.handle(req, res, next));
    } catch (err) {
      next(err);
    }
  };

// --- USERS ---
router.post("/users", asyncHandler(new CreateUserController()));
router.post("/session", asyncHandler(new AuthUserController()));
router.get("/me", isAuthenticated, asyncHandler(new DetailUserController()));
router.put("/users", isAuthenticated, asyncHandler(new UpdateUserController()));

// --- HAIRCUTS ---
router.post(
  "/haircut",
  isAuthenticated,
  asyncHandler(new CreateHaircutController())
);
router.get(
  "/haircuts",
  isAuthenticated,
  asyncHandler(new ListHaircutController())
);
router.put(
  "/haircut",
  isAuthenticated,
  asyncHandler(new UpdateHaircutController())
);
router.get(
  "/haircuts/count",
  isAuthenticated,
  asyncHandler(new CountHaircutsController())
);
router.get(
  "/haircut/detail",
  isAuthenticated,
  asyncHandler(new DetailHaircutController())
);

// --- SCHEDULES ---
router.post(
  "/schedule",
  isAuthenticated,
  asyncHandler(new NewScheduleController())
);
router.get(
  "/schedule",
  isAuthenticated,
  asyncHandler(new ListScheduleController())
);
router.delete(
  "/schedule",
  isAuthenticated,
  asyncHandler(new FinishScheduleController())
);

export { router };
