import { Request, Response } from "express";
import {
  updateTaskUseCase,
  UpdateTaskUseCase,
} from "../useCase/UpdateTaskUseCase";

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const idTask = Number.parseInt(req.params.id);
      const { title, description, status } = req.body;

      if (!idTask || Object.keys(idTask).length === 0) {
        return res.status(400).json({
          error: "Request body is required",
        });
      }
      const result = await this.updateTaskUseCase.execute({
        title,
        description,
        status,
        idTask,
      });

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
