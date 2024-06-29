"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(status, success, message, data = null) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
