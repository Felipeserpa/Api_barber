"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailHaircutController = void 0;
const DetailHaircutService_1 = require("../../services/Haircut/DetailHaircutService");
class DetailHaircutController {
    async handle(request, response) {
        const haircut_id = request.query.haircut_id;
        const user_id = request.user_id;
        const detailHaircutService = new DetailHaircutService_1.DetailHaircutService();
        const haircut = await detailHaircutService.execute({
            haircut_id,
        });
        response.json(haircut);
    }
}
exports.DetailHaircutController = DetailHaircutController;
