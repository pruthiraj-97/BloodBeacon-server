"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const zod_1 = require("zod");
exports.signUp = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string()
        .min(6, "password must be at least 6 characters long"),
    contactNumber: zod_1.z.number()
        .min(10, "contact number should be 10 digits")
        .max(10, "contact number should be 10 digits"),
});
exports.login = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
        .min(6, "password must be at least 6 characters long")
});
