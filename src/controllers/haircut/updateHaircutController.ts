import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services/haircut/UpdateHaircutService";

export class UpdateHaircutController {
  async handle(request: Request, response: Response) {
    const { haircut_id, name, price, status } = request.body;
    const user_id = request.user_id;

    const updateHaircutService = new UpdateHaircutService();

    const haircut = await updateHaircutService.execute({
      user_id,
      haircut_id,
      name,
      price,
      status,
    });

    response.json(haircut);
  }
}
