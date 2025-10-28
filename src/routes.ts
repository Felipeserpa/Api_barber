import { Router } from "express";

// CONTROLLERS USUÁRIO
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

// CONTROLLERS HAIRCUT
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/updateHaircutController";
// import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

// CONTROLLERS AGENDAMENTOS
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

// MIDDLEWARE
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// --- ROTAS USER ---
const createUserController = new CreateUserController();
router.post("/users", createUserController.handle.bind(createUserController));

const authUserController = new AuthUserController();
router.post("/session", authUserController.handle.bind(authUserController));

const detailUserController = new DetailUserController();
router.get("/me", isAuthenticated, async (req, res, next) => {
  try {
    await detailUserController.handle(req, res);
  } catch (error) {
    next(error);
  }
});

const updateUserController = new UpdateUserController();
router.put("/users", isAuthenticated, updateUserController.handle);

// --- ROTAS HAIRCUT ---
const createHaircutController = new CreateHaircutController();
router.post("/haircut", isAuthenticated, createHaircutController.handle);

const listHaircutController = new ListHaircutController();
router.get("/haircuts", isAuthenticated, listHaircutController.handle);

const updateHaircutController = new UpdateHaircutController();
router.put("/haircut", isAuthenticated, async (req, res, next) => {
  try {
    await updateHaircutController.handle(req, res, next);
  } catch (error) {
    next(error);
  }
});

// const checkSubscriptionController = new CheckSubscriptionController();
// router.get(
//   "/haircuts/check",
//   isAuthenticated,
//   checkSubscriptionController.handle
// );

const countHaircutsController = new CountHaircutsController();
router.get("/haircuts/count", isAuthenticated, countHaircutsController.handle);

const detailHaircutController = new DetailHaircutController();
router.get("/haircut/detail", isAuthenticated, detailHaircutController.handle);

// --- ROTAS AGENDAMENTOS ---
const newScheduleController = new NewScheduleController();
router.post("/schedule", isAuthenticated, async (req, res, next) => {
  try {
    await newScheduleController.handle(req, res, next);
  } catch (error) {
    next(error);
  }
});

const listScheduleController = new ListScheduleController();
router.get("/schedule", isAuthenticated, listScheduleController.handle);

const finishScheduleController = new FinishScheduleController();
router.delete("/schedule", isAuthenticated, finishScheduleController.handle);

export { router };
