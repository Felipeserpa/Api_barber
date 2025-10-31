"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../../services/User/UpdateUserService");
class UpdateUserController {
    async handle(request, response) {
        const { name, endereco } = request.body;
        const user_id = request.user_id;
        const updateUserService = new UpdateUserService_1.UpdateUserService();
        const user = await updateUserService.execute({ user_id, name, endereco });
        return response.json(user);
    }
}
exports.UpdateUserController = UpdateUserController;
