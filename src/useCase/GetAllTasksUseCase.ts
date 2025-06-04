import { GetAllTasksDTO } from "../DTO/GetAllTasksDTO";
// import {
//   InMemoryRepository,
//   inMemoryRepository,
// } from "../Infra/InMemoryRepository";

import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class GetAllTasksUseCase {
  constructor(private prismaRepository: PrismaRepository) {}
  async execute({ idUser }: GetAllTasksDTO) {
    let tasks = await this.prismaRepository.getAllTasks({ idUser });
    console.log(tasks);
    return tasks;
  }
}

const getAllTasksUseCase = new GetAllTasksUseCase(prismaRepository);

export { getAllTasksUseCase };
