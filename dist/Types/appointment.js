"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointment = void 0;
const zod_1 = require("zod");
exports.appointment = zod_1.z.object({
    name: zod_1.z.string(),
    age: zod_1.z.number(),
    bloodGroup: zod_1.z.string(),
    contactNumber: zod_1.z.number()
        .min(10, "contact number should be exactly 10 digits")
        .max(10, "contact number should be exactly 10 digits")
});
