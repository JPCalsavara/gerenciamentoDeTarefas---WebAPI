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
    idUser,
  }: CreateTaskDTO): Promise<Task> {
    try {
      // First check if user exists
      const userExists = await this.db.user.findUnique({
        where: { id: idUser },
      });

      if (!userExists) {
        throw new Error(`User with id ${idUser} not found`);
      }

      const task = await this.db.task.create({
        data: {
          title,
          description,
          status: TaskStatus.TODO,
          userId: idUser,
        },
      });

      return new Task(
        task.title,
        task.description,
        task.status as TaskStatus,
        task.createdAt,
        task.userId,
        task.id
      );
    } catch (error) {
      console.error("Error creating task:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to create task in database");
    }
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
    idTask,
  }: UpdateTaskDTO): Promise<Task> {
    try {
      // First check if task exists
      const taskExists = await this.db.task.findUnique({
        where: { id: idTask },
      });

      if (!taskExists) {
        throw new Error(`Task with id ${idTask} not found`);
      }

      const task = await this.db.task.update({
        where: { id: idTask },
        data: {
          title,
          description,
          status,
        },
      });

      return new Task(
        task.title,
        task.description,
        task.status as TaskStatus,
        task.createdAt,
        task.userId,
        task.id
      );
    } catch (error) {
      console.error("Error updating task:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update task in database");
    }
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
