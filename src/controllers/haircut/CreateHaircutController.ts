import { Request, Response } from "express";
import { CreateHaircutService } from "../../services/Haircut/CreateHaircutService";

export class CreateHaircutController {
  async handle(request: Request, response: Response) {
    const { name, price } = request.body;
    const user_id = request.user_id;

    const createHaircutService = new CreateHaircutService();

    try {
      const haircut = await createHaircutService.execute({
        name,
        price,
        user_id,
      });

      response.json(haircut);
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  }
}
