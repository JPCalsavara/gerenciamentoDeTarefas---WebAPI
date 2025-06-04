"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserUseCase = exports.LoginUserUseCase = void 0;
const InMemoryRepository_1 = require("../Infra/InMemoryRepository");
class LoginUserUseCase {
    constructor(inMemoryRepository) {
        this.inMemoryRepository = inMemoryRepository;
    }
    async execute({ email, password }) {
        try {
            const user = await this.inMemoryRepository.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            if (password !== user.getPassword()) {
                throw new Error("Invalid password");
            }
            return user;
        }
        catch (error) {
            // Re-throw the specific errors we created
            if (error instanceof Error) {
                throw error;
            }
            // For unexpected errors
            throw new Error("An error occurred during login");
        }
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
const loginUserUseCase = new LoginUserUseCase(InMemoryRepository_1.inMemoryRepository);
exports.loginUserUseCase = loginUserUseCase;
