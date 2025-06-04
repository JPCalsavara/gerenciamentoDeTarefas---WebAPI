"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.LoginUserController = void 0;
const LoginUserUseCase_1 = require("../services/LoginUserUseCase");
class LoginUserController {
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }
    async handle(req, res) {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({
                    error: "Request body is required",
                });
            }
            const result = await this.loginUserUseCase.execute(data);
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
exports.LoginUserController = LoginUserController;
const loginUserController = new LoginUserController(LoginUserUseCase_1.loginUserUseCase);
exports.loginUserController = loginUserController;
