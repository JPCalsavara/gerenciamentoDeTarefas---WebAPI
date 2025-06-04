"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const TaskStatus_1 = require("./TaskStatus");
class Task {
    constructor(title, description, status, createdAtDate, idUser, taskId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAtDate = createdAtDate;
        this.idUser = idUser;
        this.taskId = taskId;
        this.status = TaskStatus_1.TaskStatus.TODO;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getStatus() {
        return this.status;
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
exports.Task = Task;
