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
exports.removeNotification = exports.sendNotification = void 0;
const notification_1 = require("../Types/notification");
const zod_validation_error_1 = require("zod-validation-error");
const dataValidationError_1 = require("../config/dataValidationError");
const user_model_1 = __importDefault(require("../models/user.model"));
const requestmessage_model_1 = __importDefault(require("../models/requestmessage.model"));
const fetchUserDetails_1 = require("../middleware/fetchUserDetails");
const socket_1 = require("../routers/socket");
function sendNotification(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, fetchUserDetails_1.fetchUserDetails)(req);
            const notification = {
                message: req.body.message,
                bloodGroup: req.body.bloodGroup,
                contactNumber: parseInt(req.body.contactNumber),
            };
            const result = notification_1.notificationI.safeParse(notification);
            if (!result.success) {
                const response = (0, zod_validation_error_1.fromZodError)(result.error);
                const message = (0, dataValidationError_1.dataValidationError)(response.details);
                return res.status(400).json({
                    success: false,
                    message: message
                });
            }
            const newRequest = yield requestmessage_model_1.default.create(Object.assign(Object.assign({}, result.data), { user: user.id }));
            const allusers = yield user_model_1.default.find({
                bloodGroup: result.data.bloodGroup
            });
            for (const user of allusers) {
                let socketId = (0, socket_1.getUserSocket)(user._id);
                yield user_model_1.default.updateOne({ _id: user.id }, {
                    $push: {
                        urgentNotifications: newRequest._id
                    }
                });
            }
            return res.status(200).json({
                success: true,
                message: "notification sent"
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
exports.sendNotification = sendNotification;
function removeNotification(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield (0, fetchUserDetails_1.fetchUserDetails)(req);
            yield user_model_1.default.updateOne({ _id: user.id }, {
                $pull: {
                    urgentNotifications: req.params.id
                }
            });
            return res.status(200).json({
                success: true,
                message: "notification removed"
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
exports.removeNotification = removeNotification;
