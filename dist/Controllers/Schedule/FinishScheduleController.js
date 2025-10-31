"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishScheduleController = void 0;
const FinishScheduleService_1 = require("../../services/Schedule/FinishScheduleService");
class FinishScheduleController {
    async handle(request, response) {
        const { schedule_id } = request.body;
        const { user_id } = request.body;
        const finishSchedule = new FinishScheduleService_1.FinishScheduleService();
        const schedule = await finishSchedule.execute({
            schedule_id,
            user_id,
        });
        return response.json(schedule);
    }
}
exports.FinishScheduleController = FinishScheduleController;
