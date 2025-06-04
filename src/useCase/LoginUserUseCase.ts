import { jWTAuthenticationService } from "../auth/JWTAuthenticationService";
import { LoginUserDTO } from "../DTO/LoginUserDTO";
// import {
//   InMemoryRepository,
//   inMemoryRepository,
// } from "../Infra/InMemoryRepository";

import { PrismaRepository, prismaRepository } from "../Infra/RepositoryDB";

export class LoginUserUseCase {
  constructor(private prismaRepository: PrismaRepository) {}
  async execute({ email, password }: LoginUserDTO) {
    try {
      const user = await this.prismaRepository.findUserByEmail(email);

      if (!user) {
        throw new Error("User not found");
      }

      if (email !== user.getEmail()) {
        throw new Error("User not found");
      }

      if (password !== user.getPassword()) {
        throw new Error("Password wrong");
      }

      const id = user.getId();
      console.log("Meu id: " + id);

      const token = await jWTAuthenticationService.JWTSignService({
        email,
        id,
      });
      return { token };
    } catch (error) {
      // Re-throw the specific errors we created
      if (error instanceof Error) {
        throw error;
      }
      // For unexpected errors
      throw new Error("An error occurred during login");
    }
  }
}

const loginUserUseCase = new LoginUserUseCase(prismaRepository);
export { loginUserUseCase };
