"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = exports.CreateUserUseCase = void 0;
const InMemoryRepository_1 = require("../Infra/InMemoryRepository");
class CreateUserUseCase {
    constructor(inMemoryRepository) {
        this.inMemoryRepository = inMemoryRepository;
    }
    async execute({ name, email, password }) {
        await this.inMemoryRepository.createUser({ name, email, password });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
const createUserUseCase = new CreateUserUseCase(InMemoryRepository_1.inMemoryRepository);
exports.createUserUseCase = createUserUseCase;
