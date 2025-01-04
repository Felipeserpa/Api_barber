import { Request, Response } from "express";
import { CreateHaircutService } from "../../services/haircut/CreateHaircutService";

export class CreateHaircutController {
  async handle(request: Request, response: Response) {
    const { name, price } = request.body;
    const user_id = request.user_id;

    const createHaircutService = new CreateHaircutService();

    const haircut = await createHaircutService.execute({
      name,
      price,
      user_id,
    });

    return response.json(haircut);
  }
}
