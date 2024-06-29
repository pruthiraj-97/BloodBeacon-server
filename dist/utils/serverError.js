"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSiteError = void 0;
class ServerSiteError extends Error {
    constructor(status, success, message) {
        super();
        this.message = message;
        this.status = status;
        this.success = success;
    }
}
exports.ServerSiteError = ServerSiteError;
