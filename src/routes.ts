import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

// Cortes e preços
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CheckSubscriptionController } from "./controllers/haircut/CkeckSubscriptionControlle";
import { CountHaircutsController } from "./controllers/haircut/CountHaircutsController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

// Agendamentos
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// --- ROTAS USER ---
const createUserController = new CreateUserController();
router.post("/users", createUserController.handle); // handle deve ser arrow function no controller

const authUserController = new AuthUserController();
router.post("/session", authUserController.handle);

const detailUserController = new DetailUserController();
router.get("/me", isAuthenticated, detailUserController.handle);

const updateUserController = new UpdateUserController();
router.put("/users", isAuthenticated, updateUserController.handle);

// --- ROTAS DOS CORTES ---
const createHaircutController = new CreateHaircutController();
router.post("/haircut", isAuthenticated, createHaircutController.handle);

const listHaircutController = new ListHaircutController();
router.get("/haircuts", isAuthenticated, listHaircutController.handle);

const updateHaircutController = new UpdateHaircutController();
router.put("/haircut", isAuthenticated, updateHaircutController.handle);

const checkSubscriptionController = new CheckSubscriptionController();
router.get(
  "/haircuts/check",
  isAuthenticated,
  checkSubscriptionController.handle
);

const countHaircutsController = new CountHaircutsController();
router.get("/haircuts/count", isAuthenticated, countHaircutsController.handle);

const detailHaircutController = new DetailHaircutController();
router.get("/haircut/detail", isAuthenticated, detailHaircutController.handle);

// --- ROTAS DOS AGENDAMENTOS ---
const newScheduleController = new NewScheduleController();
router.post("/schedule", isAuthenticated, newScheduleController.handle);

const listScheduleController = new ListScheduleController();
router.get("/schedule", isAuthenticated, listScheduleController.handle);

const finishScheduleController = new FinishScheduleController();
router.delete("/schedule", isAuthenticated, finishScheduleController.handle);

export { router };
