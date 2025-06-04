"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskUseCase = exports.CreateTaskUseCase = void 0;
const InMemoryRepository_1 = require("../Infra/InMemoryRepository");
class CreateTaskUseCase {
    constructor(inMemoryRepository) {
        this.inMemoryRepository = inMemoryRepository;
    }
    async execute({ title, description, idUser }) {
        try {
            const task = await this.inMemoryRepository.createTask({
                title,
                description,
                idUser,
            });
        }
        catch (error) {
            throw new Error("Error creating task");
        }
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
const createTaskUseCase = new CreateTaskUseCase(InMemoryRepository_1.inMemoryRepository);
exports.createTaskUseCase = createTaskUseCase;
