"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListHaircutController = void 0;
const ListHaircutService_1 = require("../../services/Haircut/ListHaircutService");
class ListHaircutController {
    async handle(request, response) {
        const user_id = request.user_id;
        const status = request.query.status;
        const listHaircutService = new ListHaircutService_1.ListHaircutService();
        const haircuts = await listHaircutService.execute({ user_id, status });
        response.json(haircuts);
    }
}
exports.ListHaircutController = ListHaircutController;
