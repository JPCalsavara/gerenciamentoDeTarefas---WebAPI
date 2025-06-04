"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasksController = exports.GetAllTasksController = void 0;
const GetAllTasksUseCase_1 = require("../services/GetAllTasksUseCase");
class GetAllTasksController {
    constructor(getAllTasksUseCase) {
        this.getAllTasksUseCase = getAllTasksUseCase;
    }
    async handle(req, res) {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({
                    error: "Request body is required",
                });
            }
            const result = await this.getAllTasksUseCase.execute(data);
            if (!result) {
                return res.status(201).json({ error: "Any Task found" });
            }
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
exports.GetAllTasksController = GetAllTasksController;
const getAllTasksController = new GetAllTasksController(GetAllTasksUseCase_1.getAllTasksUseCase);
exports.getAllTasksController = getAllTasksController;
