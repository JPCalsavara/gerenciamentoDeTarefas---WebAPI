import { TaskStatus } from "./TaskStatus";

export interface TaskInterface {
  title: string;
  description: string;
  status: string;
  createdAtDate: Date;
  idUser: number;
  taskId: number;
}

export class Task {
  constructor(
    private title: string,
    private description: string,
    private status: TaskStatus,
    private createdAtDate: Date,
    private idUser: number,
    private taskId: number
  ) {
    this.status = TaskStatus.TODO;
  }

  getTitle() {
    return this.title;
  }
  setTitle(title: string) {
    this.title = title;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: TaskStatus) {
    this.status = status;
  }

  getCreatedAtDate() {
    return this.createdAtDate;
  }

  getIdUser() {
    return this.idUser;
  }

  getIdTask() {
    return this.taskId;
  }
}
