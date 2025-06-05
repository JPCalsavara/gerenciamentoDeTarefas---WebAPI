import { CreateTaskDTO } from "../DTO/CreateTaskDTO";
import { Task } from "../entities/Task";
import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class CreateTaskUseCase {
  constructor(private prismaRepository: PrismaRepository) {}

  async execute({ title, description, idUser }: CreateTaskDTO): Promise<Task> {
    try {
      const task = await this.prismaRepository.createTask({
        title,
        description,
        idUser,
      });

      if (!task) {
        throw new Error("Failed to create task");
      }

      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error(
        error instanceof Error ? error.message : "Error creating task"
      );
    }
  }
}

const createTaskUseCase = new CreateTaskUseCase(prismaRepository);

export { createTaskUseCase };
