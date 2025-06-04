import { TaskStatus } from "../entities/TaskStatus";

export interface UpdateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
  idTask: number;
}
