import { Request, Response } from "express";
import {
  updateTaskUseCase,
  UpdateTaskUseCase,
} from "../useCase/UpdateTaskUseCase";

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          error: "Request body is required",
        });
      }
      const result = await this.updateTaskUseCase.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

const updateTaskController = new UpdateTaskController(updateTaskUseCase);

export { updateTaskController };
