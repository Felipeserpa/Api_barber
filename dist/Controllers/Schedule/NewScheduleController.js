"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewScheduleController = void 0;
const NewScheduleService_1 = require("../../services/Schedule/NewScheduleService");
class NewScheduleController {
    async handle(request, response) {
        const { haircut_id, customer } = request.body;
        const user_id = request.user_id;
        const newSchedule = new NewScheduleService_1.NewScheduleService();
        const schedule = await newSchedule.execute({
            user_id,
            haircut_id,
            customer,
        });
        return response.json(schedule);
    }
}
exports.NewScheduleController = NewScheduleController;
