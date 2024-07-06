"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Appointment = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    bloodBankId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'bloodBank'
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Appointment', Appointment);
