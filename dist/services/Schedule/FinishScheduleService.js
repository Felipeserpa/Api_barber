"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishScheduleService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FinishScheduleService {
    async execute({ schedule_id, user_id }) {
        if (schedule_id === "" || user_id === "") {
            throw new Error("Error");
        }
        try {
            const belongsToUser = await prisma_1.default.service.findFirst({
                where: {
                    id: schedule_id,
                    user_id: user_id,
                },
            });
            if (!belongsToUser) {
                throw new Error("not authorized");
            }
            await prisma_1.default.service.delete({
                where: {
                    id: schedule_id,
                },
            });
            return { message: "finalizado com sucesso" };
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.FinishScheduleService = FinishScheduleService;
