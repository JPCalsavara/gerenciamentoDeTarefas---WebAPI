import { Request, Response } from "express";
import {
  updateTaskUseCase,
  UpdateTaskUseCase,
} from "../useCase/UpdateTaskUseCase";

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const idTask = Number(req.params.id);
      const { title, description, status } = req.body;

      if (isNaN(idTask)) {
        res.status(400).json({
          error: "Invalid task ID",
        });
        return;
      }

      if (!title || !description || !status) {
        res.status(400).json({
          error: "Missing required fields: title, description, or status",
        });
        return;
      }

      const result = await this.updateTaskUseCase.execute({
        title,
        description,
        status,
        idTask,
      });

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({
        error: "Internal server error",
      });
      return;
    }
  }
}

const updateTaskController = new UpdateTaskController(updateTaskUseCase);

export { updateTaskController };
