"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateUserService {
    async execute({ user_id, name, endereco }) {
        if (!user_id) {
            throw new Error("User ID is missing");
        }
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
            },
        });
        if (!userAlreadyExists) {
            throw new Error("User not exists");
        }
        const userUpdated = await prisma_1.default.user.update({
            where: {
                id: user_id,
            },
            data: {
                name,
                endereco,
            },
            select: {
                name: true,
                endereco: true,
                email: true,
            },
        });
        return userUpdated;
    }
}
exports.UpdateUserService = UpdateUserService;
