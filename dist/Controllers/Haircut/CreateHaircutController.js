"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHaircutController = void 0;
const CreateHaircutService_1 = require("../../services/Haircut/CreateHaircutService");
class CreateHaircutController {
    async handle(request, response) {
        const { name, price } = request.body;
        const user_id = request.user_id;
        const createHaircutService = new CreateHaircutService_1.CreateHaircutService();
        try {
            const haircut = await createHaircutService.execute({
                name,
                price,
                user_id,
            });
            response.json(haircut);
        }
        catch (err) {
            if (err instanceof Error) {
                response.status(400).json({ error: err.message });
            }
            else {
                response.status(400).json({ error: String(err) });
            }
        }
    }
}
exports.CreateHaircutController = CreateHaircutController;
