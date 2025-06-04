"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskController = exports.CreateTaskController = void 0;
const CreateTaskUseCase_1 = require("../services/CreateTaskUseCase");
class CreateTaskController {
    constructor(createTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
    }
    async handle(req, res) {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({
                    error: "Request body is required",
                });
            }
            const result = await this.createTaskUseCase.execute(data);
            return res.status(201).json(result);
        }
        catch (error) {
            console.error("Error creating task:", error);
            return res.status(500).json({
                error: "Internal server error",
            });
        }
    }
}
exports.CreateTaskController = CreateTaskController;
const createTaskController = new CreateTaskController(CreateTaskUseCase_1.createTaskUseCase);
exports.createTaskController = createTaskController;
