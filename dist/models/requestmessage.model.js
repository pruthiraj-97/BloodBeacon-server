"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestMessageSchema = new mongoose_1.default.Schema({
    message: {
        type: String,
        require: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    contactNumber: {
        type: Number
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('requestMessage', requestMessageSchema);
