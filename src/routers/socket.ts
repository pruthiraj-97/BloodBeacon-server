import express from 'express';
import { Server, createServer } from 'http';
import { Socket } from 'socket.io';
import { socketI } from '../Interface/interface';

export const app = express();
const server = createServer(app);
const io = new Server(server);

interface UserSocketMap {
    [userId: string]: Socket;
}

export const userSocketMap: UserSocketMap = {};

export function getUserSocket(userId: string): Socket | null {
    return userSocketMap[userId] ?? null;
}

io.on('connection', (socket: Socket) => {
    userSocketMap[socket.id] = socket;
    socket.on('disconnect', () => {
        delete userSocketMap[socket.id];
    });
});

export default io;

