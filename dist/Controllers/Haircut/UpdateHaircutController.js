"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHaircutController = void 0;
const UpdateHaircutService_1 = require("../../services/Haircut/UpdateHaircutService");
class UpdateHaircutController {
    async handle(request, response) {
        const { haircut_id, name, price, status } = request.body;
        const user_id = request.user_id;
        const updateHaircutService = new UpdateHaircutService_1.UpdateHaircutService();
        const haircut = await updateHaircutService.execute({
            user_id,
            haircut_id,
            name,
            price,
            status,
        });
        response.json(haircut);
    }
}
exports.UpdateHaircutController = UpdateHaircutController;
