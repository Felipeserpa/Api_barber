"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// --- Middlewares ---
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// --- Usuários (User) ---
const CreateUserController_1 = require("./Controllers/User/CreateUserController");
const AuthUserController_1 = require("./Controllers/User/AuthUserController");
const DetailUserController_1 = require("./Controllers/User/DetailUserController");
const UpdateUserController_1 = require("./Controllers/User/UpdateUserController");
// --- Cortes de Cabelo (Haircut) ---
const CreateHaircutController_1 = require("./Controllers/Haircut/CreateHaircutController");
const ListHaircutController_1 = require("./Controllers/Haircut/ListHaircutController");
const UpdateHaircutController_1 = require("./Controllers/Haircut/UpdateHaircutController");
const CkeckSubscriptionController_1 = require("./Controllers/Haircut/CkeckSubscriptionController");
const CountHaircutsController_1 = require("./Controllers/Haircut/CountHaircutsController");
const DetailHaircutController_1 = require("./Controllers/Haircut/DetailHaircutController");
// --- Serviços/Agendamentos (Schedule) ---
const NewScheduleController_1 = require("./Controllers/Schedule/NewScheduleController");
const ListScheduleController_1 = require("./Controllers/Schedule/ListScheduleController");
const FinishScheduleController_1 = require("./Controllers/Schedule/FinishScheduleController");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * ✅ Função que converte qualquer controller em um middleware Express válido
 * (resolve o problema de tipagem com TypeScript)
 */
const controllerHandler = (controller) => {
    return async (req, res, next) => {
        try {
            await controller.handle(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
// --- Rotas de Usuário ---
router.post("/users", controllerHandler(new CreateUserController_1.CreateUserController()));
router.post("/session", controllerHandler(new AuthUserController_1.AuthUserController()));
router.get("/detail", isAuthenticated_1.isAuthenticated, controllerHandler(new DetailUserController_1.DetailUserController()));
router.put("/users", isAuthenticated_1.isAuthenticated, controllerHandler(new UpdateUserController_1.UpdateUserController()));
// --- Rotas de Corte de Cabelo (Haircut) ---
router.post("/haircut", isAuthenticated_1.isAuthenticated, controllerHandler(new CreateHaircutController_1.CreateHaircutController()));
router.get("/haircuts", isAuthenticated_1.isAuthenticated, controllerHandler(new ListHaircutController_1.ListHaircutController()));
router.put("/haircut", isAuthenticated_1.isAuthenticated, controllerHandler(new UpdateHaircutController_1.UpdateHaircutController()));
router.get("/haircut/check", isAuthenticated_1.isAuthenticated, controllerHandler(new CkeckSubscriptionController_1.CheckSubscriptionController()));
router.get("/haircut/detail", isAuthenticated_1.isAuthenticated, controllerHandler(new CountHaircutsController_1.CountHaircutsController()));
router.delete("/haircut", isAuthenticated_1.isAuthenticated, controllerHandler(new DetailHaircutController_1.DetailHaircutController()));
// --- Rotas de Serviço/Agendamento (Schedule) ---
router.post("/schedule", isAuthenticated_1.isAuthenticated, controllerHandler(new NewScheduleController_1.NewScheduleController()));
router.get("/schedule", isAuthenticated_1.isAuthenticated, controllerHandler(new ListScheduleController_1.ListScheduleController()));
router.put("/schedule/finish", isAuthenticated_1.isAuthenticated, controllerHandler(new FinishScheduleController_1.FinishScheduleController()));
