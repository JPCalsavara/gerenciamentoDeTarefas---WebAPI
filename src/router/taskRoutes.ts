import { Router, Request, Response } from "express";
import { getAllTasksController } from "../controller/GetAllTasksController"; // Ajuste o caminho
import { createTaskController } from "../controller/CreateTaskController"; // Ajuste o caminho
import { updateTaskController } from "../controller/UpdateTaskController"; // Ajuste o caminho
import { deleteTaskController } from "../controller/DeleteTaskController"; // Ajuste o caminho

// Cria uma nova instância do Router do Express
const taskRoutes = Router();

// As rotas de tarefas não terão o middleware de autenticação definido aqui.
// Ele será aplicado no app.ts quando este router for montado.

// Rota para obter todas as tarefas de um usuário
taskRoutes.get("/", async (req: Request, res: Response) => {
  await getAllTasksController.handle(req, res);
});

// Rota para criar uma nova tarefa
taskRoutes.post("/", async (req: Request, res: Response) => {
  await createTaskController.handle(req, res);
});

// Rota para atualizar uma tarefa específica pelo ID
taskRoutes.put("/:id", async (req: Request, res: Response) => {
  await updateTaskController.handle(req, res);
});

// Rota para deletar uma tarefa específica pelo ID
taskRoutes.delete("/:id", async (req: Request, res: Response) => {
  await deleteTaskController.handle(req, res);
});

// Exporta o router para ser usado no arquivo principal da aplicação
export { taskRoutes };
