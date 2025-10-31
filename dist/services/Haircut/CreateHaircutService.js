"use strict";
//Criaçao de modelos de corte.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHaircutService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateHaircutService {
    async execute({ user_id, name, price }) {
        if (!user_id || !name || !price) {
            throw new Error("Error");
        }
        const myHaircuts = await prisma_1.default.haircut.count({
            where: {
                user_id: user_id,
            },
        });
        const user = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
            },
            include: {
                subscripitons: true,
            },
        });
        if (myHaircuts >= 3 && user?.subscripitons?.status !== "active") {
            throw new Error("Not authorized");
        }
        const haircut = await prisma_1.default.haircut.create({
            data: {
                name: name,
                price: price,
                user_id: user_id,
            },
        });
        return haircut;
    }
}
exports.CreateHaircutService = CreateHaircutService;
