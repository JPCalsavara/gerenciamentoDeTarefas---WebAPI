import { UpdateTaskDTO } from "../DTO/UpdateTaskDTO";
// import {
//   inMemoryRepository,
//   InMemoryRepository,
// } from "../Infra/InMemoryRepository";

import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class UpdateTaskUseCase {
  constructor(private prismaRepository: PrismaRepository) {}
  async execute({ title, description, status, idTask }: UpdateTaskDTO) {
    await this.prismaRepository.updateTask({
      title,
      description,
      status,
      idTask,
    });
  }
}

const updateTaskUseCase = new UpdateTaskUseCase(prismaRepository);

export { updateTaskUseCase };
