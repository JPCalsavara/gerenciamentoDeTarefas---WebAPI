import { Request, Response } from "express";
import {
  deleteTaskUseCase,
  DeleteTaskUseCase,
} from "../useCase/DeleteTaskUseCase";

export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const idTask = Number.parseInt(req.params.id);

      if (!idTask || Object.keys(idTask).length === 0) {
        return res.status(400).json({
          error: "Request body is required",
        });
      }
      const result = await this.deleteTaskUseCase.execute({ idTask });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

export { deleteTaskController };
