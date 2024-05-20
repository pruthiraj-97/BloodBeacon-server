"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.sendMessage = void 0;
const message_model_1 = __importDefault(require("../models/message.model"));
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const fetchUserDetails_1 = require("../middleware/fetchUserDetails");
const message_1 = require("../Types/message");
const zod_validation_error_1 = require("zod-validation-error");
const dataValidationError_1 = require("../config/dataValidationError");
function sendMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, fetchUserDetails_1.fetchUserDetails)(req);
            const messageType = {
                receiver: req.params.id,
                message: req.body.message,
                sender: user.id
            };
            const result = message_1.messageI.safeParse(messageType);
            if (!result.success) {
                const response = (0, zod_validation_error_1.fromZodError)(result.error);
                const message = (0, dataValidationError_1.dataValidationError)(response.details);
                return res.status(400).json({
                    success: false,
                    message: message
                });
            }
            const message = yield message_model_1.default.create(messageType);
            let conversation = yield conversation_model_1.default.findOne({
                members: {
                    $all: [messageType.sender, messageType.receiver]
                }
            });
            if (!conversation) {
                conversation = yield conversation_model_1.default.create({
                    members: [messageType.sender, messageType.receiver],
                    messages: []
                });
            }
            yield conversation_model_1.default.updateOne({
                _id: conversation === null || conversation === void 0 ? void 0 : conversation._id
            }, {
                $push: {
                    messages: message._id
                }
            });
            return res.status(200).json({
                success: true,
                message: 'message sent successfully'
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error
            });
        }
    });
}
exports.sendMessage = sendMessage;
function getMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, fetchUserDetails_1.fetchUserDetails)(req);
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'please provide id'
                });
            }
            const conversations = yield conversation_model_1.default.findOne({
                $in: {
                    members: [user.id, id]
                }
            });
            return res.status(200).json({
                success: true,
                messages: conversations
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error
            });
        }
    });
}
exports.getMessage = getMessage;
