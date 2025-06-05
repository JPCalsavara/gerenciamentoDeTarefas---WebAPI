import { Request, Response } from "express";
import {
  createTaskUseCase,
  CreateTaskUseCase,
} from "../useCase/CreateTaskUseCase";

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        res.status(400).json({
          error: "Request body is required",
        });
        return;
      }

      console.log("estou no controlador");

      const result = await this.createTaskUseCase.execute(data);

      console.log("\n", result, "\n");

      res.status(201).json({ message: "Task created successfully" });
      return;
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        error: "Internal server error",
      });
      return;
    }
  }
}

const createTaskController = new CreateTaskController(createTaskUseCase);

export { createTaskController };
