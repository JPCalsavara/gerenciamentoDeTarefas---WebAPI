"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetAllTasksController_1 = require("./controller/GetAllTasksController");
const JWTAuthenticationService_1 = require("./auth/JWTAuthenticationService");
const InMemoryRepository_1 = require("./Infra/InMemoryRepository");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: "Authorization header not provided" });
            return;
        }
        const [bearer, token] = authHeader.split(" ");
        if (bearer !== "Bearer" || !token) {
            res.status(401).json({ error: "Invalid token format" });
            return;
        }
        const decoded = await JWTAuthenticationService_1.jWTAuthenticationService.JWTValidationService(token);
        if (!decoded) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        req.body.user = decoded;
        next();
        return;
    }
    catch (error) {
        res.status(401).json({
            error: "Authentication failed",
            message: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
};
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await InMemoryRepository_1.inMemoryRepository.findUserByEmail(email);
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
        const token = await JWTAuthenticationService_1.jWTAuthenticationService.JWTSignService({
            email,
            id,
        });
        res.json({ token });
        return;
    }
    catch (error) {
        res.status(400).json({ error: "Authentication failed" });
        return;
    }
});
app.post("/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Add your registration logic here
        res.status(201).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        res.status(400).json({ error: "Registration failed" });
        return;
    }
});
// Protected routes
app.get("/tasks", authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const tasks = await GetAllTasksController_1.getAllTasksController.handle(req, res);
        res.json(tasks);
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
        return;
    }
});
// app.post("/tasks", authMiddleware, async (req: Request, res: Response) => {
//   try {
//     const { id } = req.user as JWTPayload;
//     const { title, description } = req.body;
//     const tasks = await createTaskController.handle(req, res);
//     res.json(tasks);
//     res.status(201).json({ message: "Task created successfully" });
//     return;
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create task" });
//     return;
//   }
// });
// app.put("/tasks/:id", authMiddleware, async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     // Add your update task logic here
//     res.json({ message: "Task updated successfully" });
//     return;
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update task" });
//     return;
//   }
// });
// app.delete(
//   "/tasks/:id",
//   authMiddleware,
//   async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       // Add your delete task logic here
//       res.json({ message: "Task deleted successfully" });
//       return;
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete task" });
//       return;
//     }
//   }
// );
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
