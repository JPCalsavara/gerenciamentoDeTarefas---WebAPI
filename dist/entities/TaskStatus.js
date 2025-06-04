"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
/**
 * Represents the possible states of a task
 */
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "TODO";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["COMPLETED"] = "COMPLETED";
    TaskStatus["CANCELLED"] = "CANCELLED";
    TaskStatus["ON_HOLD"] = "ON_HOLD";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
