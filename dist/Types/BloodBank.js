"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBloodBankI = exports.BloodBankI = void 0;
const zod_1 = require("zod");
exports.BloodBankI = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contactNumber: zod_1.z.number()
        .refine(val => val.toString().length === 10, {
        message: "contact number should be exactly 10 digits"
    }),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number()
});
exports.searchBloodBankI = zod_1.z.object({
    longitude: zod_1.z.number(),
    latitude: zod_1.z.number(),
    bloodGroup: zod_1.z.string(),
    distance: zod_1.z.number().default(20)
});
