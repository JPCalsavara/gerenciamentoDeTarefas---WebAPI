import { CreateTaskDTO } from "../DTO/CreateTaskDTO";
import { CreateUserDTO } from "../DTO/CreateUserDTO";
import { DeleteTaskDTO } from "../DTO/DeleteTaskDTO";
import { GetAllTasksDTO } from "../DTO/GetAllTasksDTO";
import { UpdateTaskDTO } from "../DTO/UpdateTaskDTO";
import { Task } from "../entities/Task";
import { TaskStatus } from "../entities/TaskStatus";
import { User } from "../entities/User";

class InMemoryRepository {
  private userList: User[];
  private taskList: Task[];
  private idUser: number;
  private idTask: number;
  constructor() {
    this.userList = [new User("joao", "joao@gmail.com", "1234", 0)];
    this.taskList = [];
    this.idUser = 1;
    this.idTask = 0;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = this.userList.find((user) => email === user.getEmail());
    return user;
  }

  async findUserByID(email: string): Promise<User | undefined> {
    const user = this.userList.find((user) => email === user.getEmail());
    return user;
  }

  async createUser({ name, email, password }: CreateUserDTO) {
    const id = this.idUser;
    this.idUser += 1;
    const user = new User(name, email, password, id);
    this.userList.push(user);
  }

  async createTask({ title, description, idUser }: CreateTaskDTO) {
    const idTask = this.idTask;
    this.idTask += 1;
    const date = new Date(Date.now());
    const status = TaskStatus.TODO;
    const task = new Task(title, description, status, date, idUser, idTask);
    console.log("Crio a tarefa");
    this.taskList.push(task);
  }

  async getAllTasks({ idUser }: GetAllTasksDTO): Promise<Task[]> {
    const tasks = this.taskList.filter((task) => idUser === task.getIdUser());
    console.log("Mostrando todas as tarefas:", this.taskList);
    console.log("Mostrando tarefas do usuário:", tasks);
    return tasks;
  }

  async updateTask({ title, description, status, idTask }: UpdateTaskDTO) {
    const task = this.taskList.find((task) => task.getIdTask() === idTask);

    task?.setTitle(title);
    task?.setDescription(description);
    task?.setStatus(status);
  }

  async deleteTask({ idTask }: DeleteTaskDTO) {
    this.taskList = this.taskList.filter((task) => task.getIdTask() !== idTask);
  }
}

const inMemoryRepository = new InMemoryRepository();

export { InMemoryRepository, inMemoryRepository };
