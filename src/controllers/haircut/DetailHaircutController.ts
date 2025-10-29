import { Request, Response } from "express";
import { DetailHaircutService } from "../../services/haircut/DetailHaircutService";

export class DetailHaircutController {
  async handle(request: Request, response: Response) {
    const haircut_id = request.query.haircut_id as string;
    const user_id = request.user_id;

    const detailHaircutService = new DetailHaircutService();

    const haircut = await detailHaircutService.execute({
      haircut_id,
    });

    response.json(haircut);
  }
}
