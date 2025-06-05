import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO } from "../DTO/CreateTaskDTO";
import { CreateUserDTO } from "../DTO/CreateUserDTO";
import { DeleteTaskDTO } from "../DTO/DeleteTaskDTO";
import { GetAllTasksDTO } from "../DTO/GetAllTasksDTO";
import { UpdateTaskDTO } from "../DTO/UpdateTaskDTO";
import { Task } from "../entities/Task";
import { TaskStatus } from "../entities/TaskStatus";
import { User } from "../entities/User";

class PrismaRepository {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    // O ID do usuário agora é um número (Int) no PostgreSQL
    return user
      ? new User(user.name, user.email, user.password, user.id)
      : undefined;
  }

  // O ID do usuário agora é um número (Int)
  async findUserByID(id: number): Promise<User | undefined> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    // O ID do usuário agora é um número (Int)
    return user
      ? new User(user.name, user.email, user.password, user.id)
      : undefined;
  }

  async createUser({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = await this.db.user.create({
      data: {
        name,
        email,
        password, // Lembre-se: Em produção, sempre hashie a senha antes de armazenar!
      },
    });

    // O ID do usuário agora é um número (Int)
    return new User(user.name, user.email, user.password, user.id);
  }

  async createTask({
    title,
    description,
    idUser, // idUser agora é um número (Int)
  }: CreateTaskDTO): Promise<Task> {
    const task = await this.db.task.create({
      data: {
        title,
        description,
        status: TaskStatus.TODO,
        userId: idUser, // userId agora é um número (Int)
        // createdAt não é mais necessário aqui, pois o @default(now()) no schema.prisma
        // fará com que o banco de dados defina automaticamente a data de criação.
      },
    });

    // Os IDs (task.id e task.userId) agora são números (Int)
    return new Task(
      task.title,
      task.description,
      task.status as TaskStatus,
      task.createdAt,
      task.userId,
      task.id
    );
  }

  async getAllTasks({ idUser }: GetAllTasksDTO): Promise<Task[]> {
    const tasks = await this.db.task.findMany({
      where: {
        userId: idUser, // userId agora é um número (Int)
      },
    });

    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.status as TaskStatus,
          task.createdAt,
          task.userId, // userId agora é um número (Int)
          task.id // id agora é um número (Int)
        )
    );
  }

  async updateTask({
    title,
    description,
    status,
    idTask, // idTask agora é um número (Int)
  }: UpdateTaskDTO): Promise<Task> {
    const task = await this.db.task.update({
      where: { id: idTask }, // idTask agora é um número (Int)
      data: {
        title,
        description,
        status,
      },
    });

    // Os IDs (task.id e task.userId) agora são números (Int)
    return new Task(
      task.title,
      task.description,
      task.status as TaskStatus,
      task.createdAt,
      task.userId,
      task.id
    );
  }

  async deleteTask({ idTask }: DeleteTaskDTO): Promise<void> {
    await this.db.task.delete({
      where: { id: idTask }, // idTask agora é um número (Int)
    });
  }

  async disconnect(): Promise<void> {
    await this.db.$disconnect();
  }
}

const prismaRepository = new PrismaRepository();

export { PrismaRepository, prismaRepository };
