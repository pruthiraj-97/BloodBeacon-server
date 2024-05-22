"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSocket = exports.userSocketMap = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
exports.app = (0, express_1.default)();
const server = (0, http_1.createServer)(exports.app);
const io = new http_1.Server(server);
exports.userSocketMap = {};
function getUserSocket(userId) {
    var _a;
    return (_a = exports.userSocketMap[userId]) !== null && _a !== void 0 ? _a : null;
}
exports.getUserSocket = getUserSocket;
io.on('connection', (socket) => {
    exports.userSocketMap[socket.id] = socket;
    socket.on('disconnect', () => {
        delete exports.userSocketMap[socket.id];
    });
});
exports.default = io;
