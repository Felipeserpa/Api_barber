"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserController = void 0;
const DetailUserService_1 = require("../../services/User/DetailUserService");
class DetailUserController {
    async handle(request, response) {
        const user_id = request.user_id;
        const userDetailService = new DetailUserService_1.UserDetailService();
        const detailUser = await userDetailService.execute(user_id);
        return response.json(detailUser);
    }
}
exports.DetailUserController = DetailUserController;
