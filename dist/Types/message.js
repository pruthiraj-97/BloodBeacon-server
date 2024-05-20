"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageI = void 0;
const zod_1 = require("zod");
exports.messageI = zod_1.z.object({
    message: zod_1.z.string(),
    sender: zod_1.z.string(),
    receiver: zod_1.z.string()
});
