"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignUp = void 0;
const zod_1 = require("zod");
exports.userSignUp = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "password must be at least 6 characters long"),
    contactNumber: zod_1.z.number()
        .refine(val => val.toString().length === 10, {
        message: "contact number should be exactly 10 digits"
    }),
    bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        errorMap: () => ({ message: 'Invalid blood group' })
    })
});
exports.userLogin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
