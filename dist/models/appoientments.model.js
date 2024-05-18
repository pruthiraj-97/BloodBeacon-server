"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
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
    contactNumber: {
        type: Number,
        require: true
    },
    bloodBank: {
        type: mongoose_1.default.Schema.Types.ObjectId
    }
});
module.exports = mongoose_1.default.model('appointment', appointmentSchema);
