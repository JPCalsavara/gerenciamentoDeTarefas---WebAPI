import { DeleteTaskDTO } from "../DTO/DeleteTaskDTO";
// import {
//   inMemoryRepository,
//   InMemoryRepository,
// } from "../Infra/InMemoryRepository";

import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class DeleteTaskUseCase {
  constructor(private prismaRepository: PrismaRepository) {}
  async execute({ idTask }: DeleteTaskDTO) {
    await this.prismaRepository.deleteTask({ idTask });
  }
}

const deleteTaskUseCase = new DeleteTaskUseCase(prismaRepository);

export { deleteTaskUseCase };
