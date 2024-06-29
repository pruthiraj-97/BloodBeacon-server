"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseError = void 0;
class ApiResponseError {
    constructor(status, success, message) {
        this.status = status;
        this.success = success;
        this.message = message;
    }
}
exports.ApiResponseError = ApiResponseError;
