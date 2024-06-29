"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    password: 'D12mjOuXAfynmJn16mSq1Y3RBwl8P6wl',
    socket: {
        host: 'redis-10532.c90.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 10532
    }
});
redisClient.on('error', (error) => {
    console.log("redis connection error", error);
});
redisClient.on('connect', () => {
    console.log("redis connected");
});
redisClient.connect();
exports.default = redisClient;
