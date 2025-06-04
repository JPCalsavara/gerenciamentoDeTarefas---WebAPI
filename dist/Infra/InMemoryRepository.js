"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryRepository = exports.InMemoryRepository = void 0;
const Task_1 = require("../entities/Task");
const TaskStatus_1 = require("../entities/TaskStatus");
const User_1 = require("../entities/User");
class InMemoryRepository {
    constructor() {
        this.userList = [];
        this.taskList = [];
        this.idUser = 0;
        this.idTask = 0;
    }
    async findUserByEmail(email) {
        const user = this.userList.find((user) => email === user.getEmail());
        return user;
    }
    async findUserByID(email) {
        const user = this.userList.find((user) => email === user.getEmail());
        return user;
    }
    async createUser({ name, email, password }) {
        const id = this.idUser;
        this.idUser += 1;
        const user = new User_1.User(name, email, password, id);
        this.userList.push(user);
    }
    async createTask({ title, description, idUser }) {
        const idTask = this.idTask;
        this.idTask += 1;
        const date = new Date(Date.now());
        const status = TaskStatus_1.TaskStatus.TODO;
        const task = new Task_1.Task(title, description, status, date, idUser, idTask);
    }
    async getAllTasks({ idUser }) {
        const tasks = this.taskList.filter((task) => idUser === task.getIdUser());
        if (!tasks.length) {
            return [];
        }
        return tasks;
    }
    async updateTask({ title, description, status, idTask }) {
        const task = this.taskList.find((task) => task.getIdTask() === idTask);
    }
    ;
    async deleteTask({}) {
    }
}
exports.InMemoryRepository = InMemoryRepository;
const inMemoryRepository = new InMemoryRepository();
exports.inMemoryRepository = inMemoryRepository;
