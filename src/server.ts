import express, { Request, Response, NextFunction } from "express";
import {
  jWTAuthenticationService,
  JWTPayload,
} from "./auth/JWTAuthenticationService";

import dotenv from "dotenv";

// Importe os routers que você criou
import { userRoutes } from "./router/userRoutes"; // Ajuste o caminho
import { taskRoutes } from "./router/taskRoutes"; // Ajuste o caminho

dotenv.config(); // Carrega as variáveis de ambiente do .env

const app = express(); // Inicializa o Express
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// 1. Defina uma interface personalizada para a Request
// Isso permite que o TypeScript saiba que 'req.user' existe.
interface AuthRequest extends Request {
  user?: JWTPayload;
}

// Middleware de autenticação JWT
// Agora, o 'req' é tipado como AuthRequest, permitindo 'req.user' diretamente.
const authMiddleware = async (
  req: AuthRequest, // Use a nova interface AuthRequest aqui
  res: Response,
  next: NextFunction
) => {
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

    // Assumindo que JWTValidationService retorna o payload decodificado ou null/undefined
    const decoded = await jWTAuthenticationService.JWTValidationService(token);

    if (!decoded) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    // 2. Atribua o payload decodificado diretamente a req.user
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Authentication failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

// Rotas de autenticação (não protegidas pelo authMiddleware)
app.use("/auth", userRoutes); // Todas as rotas em userRoutes serão acessadas via /auth/...

// Rotas protegidas (todas as rotas definidas em taskRoutes serão protegidas)
// O authMiddleware é aplicado ANTES que qualquer rota em taskRoutes seja processada.
app.use("/tasks", authMiddleware, taskRoutes); // Todas as rotas em taskRoutes serão acessadas via /tasks/... e exigirão autenticação

// Rota de teste simples
app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error); // Use console.error para erros
}
