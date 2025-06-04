import { CreateUserDTO } from "../DTO/CreateUserDTO";
// import {
//   inMemoryRepository,
//   InMemoryRepository,
// } from "../Infra/InMemoryRepository";

import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class CreateUserUseCase {
  constructor(private prismaRepository: PrismaRepository) {}
  async execute({ name, email, password }: CreateUserDTO) {
    await this.prismaRepository.createUser({ name, email, password });
  }
}

const createUserUseCase = new CreateUserUseCase(prismaRepository);

export { createUserUseCase };
