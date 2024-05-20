"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationI = void 0;
const zod_1 = require("zod");
exports.notificationI = zod_1.z.object({
    message: zod_1.z.string(),
    bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    contactNumber: zod_1.z.number()
        .refine(val => val.toString().length === 10, {
        message: "contact number should be exactly 10 digits"
    })
});
