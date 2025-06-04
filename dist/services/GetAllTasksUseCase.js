"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasksUseCase = exports.GetAllTasksUseCase = void 0;
const InMemoryRepository_1 = require("../Infra/InMemoryRepository");
class GetAllTasksUseCase {
    constructor(inMemoryRepository) {
        this.inMemoryRepository = inMemoryRepository;
    }
    async execute({ idUser }) {
        return this.inMemoryRepository.getAllTasks({ idUser });
    }
}
exports.GetAllTasksUseCase = GetAllTasksUseCase;
const getAllTasksUseCase = new GetAllTasksUseCase(InMemoryRepository_1.inMemoryRepository);
exports.getAllTasksUseCase = getAllTasksUseCase;
