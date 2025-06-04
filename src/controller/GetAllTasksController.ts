import { Request, Response } from "express";
import {
  getAllTasksUseCase,
  GetAllTasksUseCase,
} from "../useCase/GetAllTasksUseCase";

export class GetAllTasksController {
  constructor(private getAllTasksUseCase: GetAllTasksUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          error: "Request body is required",
        });
      }

      const result = await this.getAllTasksUseCase.execute(data);

      if (!result) {
        return res.status(201).json({ error: "Any Task found" });
      }

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

const getAllTasksController = new GetAllTasksController(getAllTasksUseCase);

export { getAllTasksController };
