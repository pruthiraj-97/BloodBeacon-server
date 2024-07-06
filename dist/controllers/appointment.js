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
const mongoose_1 = __importDefault(require("mongoose"));
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const BloodBank_model_1 = __importDefault(require("../models/BloodBank.model"));
const appointment_1 = require("../Types/appointment");
const zod_validation_error_1 = require("zod-validation-error");
const dataValidationError_1 = require("../config/dataValidationError");
const fetchUserDetails_1 = require("../middleware/fetchUserDetails");
exports.createAppointMent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = {
            name: req.body.name,
            age: parseInt(req.body.age),
            bloodGroup: req.body.bloodGroup,
            contactNumber: parseFloat(req.body.contactNumber)
        };
        const verifyData = appointment_1.appointment.safeParse(newAppointment);
        if (!verifyData.success) {
            const response = (0, zod_validation_error_1.fromZodError)(verifyData.error);
            const message = (0, dataValidationError_1.dataValidationError)(response.details);
            return res.status(400).json({
                status: 400,
                success: false,
                message: message
            });
        }
        const user = yield (0, fetchUserDetails_1.fetchUserDetails)(req);
        const { id } = req.params;
        const createAppointment = yield appointment_model_1.default.create(Object.assign(Object.assign({}, newAppointment), { bloodBankId: new mongoose_1.default.Types.ObjectId(id), userId: user.id }));
        yield BloodBank_model_1.default.updateOne({ _id: id }, {
            $push: {
                appointment: createAppointment._id
            }
        });
        return res.status(200).json({
            status: 200,
            success: true,
            message: "appointment created successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error
        });
    }
});
