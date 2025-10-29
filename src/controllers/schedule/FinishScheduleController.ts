import { Request, Response } from "express";
import { FinishScheduleService } from "../../services/Schedule/FinishScheduleService";

class FinishScheduleController {
  async handle(request: Request, response: Response) {
    const { schedule_id } = request.body;
    const { user_id } = request.body;

    const finishSchedule = new FinishScheduleService();

    const schedule = await finishSchedule.execute({
      schedule_id,
      user_id,
    });

    return response.json(schedule);
  }
}

export { FinishScheduleController };
