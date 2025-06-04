import { Request, Response } from "express";
import {
  createUserUseCase,
  CreateUserUseCase,
} from "../useCase/CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          error: "Request body is required",
        });
      }
      const result = await this.createUserUseCase.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
