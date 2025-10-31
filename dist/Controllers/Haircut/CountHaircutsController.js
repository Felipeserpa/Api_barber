"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountHaircutsController = void 0;
const CountHaircutService_1 = require("../../services/Haircut/CountHaircutService");
class CountHaircutsController {
    async handle(request, response, next) {
        const user_id = request.user_id;
        const countHaircutsService = new CountHaircutService_1.CountHaircutsService();
        const count = await countHaircutsService.execute({ user_id });
        response.json(count);
    }
}
exports.CountHaircutsController = CountHaircutsController;
