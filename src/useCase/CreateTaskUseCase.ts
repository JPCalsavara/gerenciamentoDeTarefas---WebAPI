import { CreateTaskDTO } from "../DTO/CreateTaskDTO";
// import {
//   InMemoryRepository,
//   inMemoryRepository,
// } from "../Infra/InMemoryRepository";

import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class CreateTaskUseCase {
  constructor(private prismaRepository: PrismaRepository) {}

  async execute({ title, description, idUser }: CreateTaskDTO) {
    try {
      await this.prismaRepository.createTask({
        title,
        description,
        idUser,
      });
    } catch (error) {
      throw new Error("Error creating task");
    }
  }
}

const createTaskUseCase = new CreateTaskUseCase(prismaRepository);

export { createTaskUseCase };
