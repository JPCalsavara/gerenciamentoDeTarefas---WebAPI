import { Router, Request, Response } from "express";
import { loginUserController } from "../controller/LoginUserController"; // Ajuste o caminho conforme necessário
import { createUserController } from "../controller/CreateUserController"; // Ajuste o caminho conforme necessário

// Cria uma nova instância do Router do Express
const userRoutes = Router();

// Rota para login de usuário
userRoutes.post("/login", async (req: Request, res: Response) => {
  await loginUserController.handle(req, res);
});

// Rota para registro de novo usuário
userRoutes.post("/register", async (req: Request, res: Response) => {
  await createUserController.handle(req, res);
});

// Exporta o router para ser usado no arquivo principal da aplicação
export { userRoutes };
