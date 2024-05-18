"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    message: {
        type: String,
        require: true
    },
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    conversation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'conversation'
    }
});
module.exports = mongoose_1.default.model('message', messageSchema);
