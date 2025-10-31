"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/User/AuthUserService");
class AuthUserController {
    async handle(request, response) {
        const { email, password } = request.body;
        const authUserService = new AuthUserService_1.AuthUserService();
        const session = await authUserService.execute({
            email,
            password,
        });
        return response.json(session);
    }
}
exports.AuthUserController = AuthUserController;
