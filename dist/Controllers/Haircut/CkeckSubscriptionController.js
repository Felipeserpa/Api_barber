"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSubscriptionController = void 0;
const CheckSubscriptionService_1 = require("../../services/Haircut/CheckSubscriptionService");
class CheckSubscriptionController {
    async handle(request, response) {
        const user_id = request.user_id;
        const checkSubscriptionService = new CheckSubscriptionService_1.CheckSubscriptionService();
        const status = await checkSubscriptionService.execute({ user_id });
        response.json(status);
    }
}
exports.CheckSubscriptionController = CheckSubscriptionController;
