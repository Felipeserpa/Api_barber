"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListScheduleController = void 0;
const ListScheduleService_1 = require("../../services/Schedule/ListScheduleService");
class ListScheduleController {
    async handle(request, response) {
        const user_id = request.user_id;
        const listSchedule = new ListScheduleService_1.ListScheduleService();
        const schedule = await listSchedule.execute({
            user_id,
        });
        return response.json(schedule);
    }
}
exports.ListScheduleController = ListScheduleController;
