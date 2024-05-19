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
exports.getBloodBank = exports.setBloodGroups = exports.registerBloodBank = void 0;
const zod_validation_error_1 = require("zod-validation-error");
const fetchUserDetails_1 = require("../middleware/fetchUserDetails");
const extratLocation_1 = require("../config/extratLocation");
const BloodBank_1 = require("../Types/BloodBank");
const BloodBank_model_1 = __importDefault(require("../models/BloodBank.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const address_model_1 = __importDefault(require("../models/address.model"));
function registerBloodBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bankDetails = {
                name: req.body.name,
                email: req.body.email,
                contactNumber: parseInt(req.body.contactNumber),
                latitude: parseFloat(req.body.latitude),
                longitude: parseFloat(req.body.longitude)
            };
            const verifyData = BloodBank_1.BloodBankI.safeParse(bankDetails);
            if (!verifyData.success) {
                return res.status(400).json({
                    success: false,
                    message: (0, zod_validation_error_1.fromZodError)(verifyData.error)
                });
            }
            const user = yield (0, fetchUserDetails_1.fetchUserDetails)(req);
            const address = yield (0, extratLocation_1.extractLocation)(bankDetails.longitude, bankDetails.latitude);
            if (!address) {
                return res.status(400).json({
                    success: false,
                    message: "location not found"
                });
            }
            const newAddress = yield address_model_1.default.create(address);
            const newBloodBank = yield BloodBank_model_1.default.create({
                name: bankDetails.name,
                email: bankDetails.email,
                contactNumber: bankDetails.contactNumber,
                location: {
                    type: 'Point',
                    coordinates: [bankDetails.longitude, bankDetails.latitude]
                },
                address: newAddress._id
            });
            yield user_model_1.default.updateOne({ _id: user.id }, {
                $set: {
                    bloodBank: newBloodBank._id
                }
            });
            res.status(200).json({
                success: true,
                message: "blood bank registered successfully"
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
exports.registerBloodBank = registerBloodBank;
function setBloodGroups(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const group = req.query.group;
            const count = req.query.count;
            if (!group || typeof group !== 'string' || !count || typeof count !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: "cheak your group and count of bloodgroup"
                });
            }
            const bloodBank = yield BloodBank_model_1.default.findById(id);
            if (!bloodBank) {
                return res.status(404).json({
                    success: false,
                    message: "Blood bank not found"
                });
            }
            const bloodGroups = bloodBank.bloodGroups;
            if (!bloodGroups.has(group)) {
                return res.status(400).json({
                    success: false,
                    message: "group not found in your blood bank"
                });
            }
            bloodGroups.set(group, parseInt(count));
            yield BloodBank_model_1.default.updateOne({ _id: id }, {
                $set: {
                    bloodGroups: bloodGroups
                }
            });
            return res.status(200).json({
                success: true,
                message: "blood group updated successfully"
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "An error occurred"
            });
        }
    });
}
exports.setBloodGroups = setBloodGroups;
function getBloodBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            console.log(id);
            const bloodBank = yield BloodBank_model_1.default.findOne({ _id: id })
                .populate({
                path: 'address',
            })
                .populate('appointments');
            console.log(bloodBank);
            return res.status(200).json({
                success: true,
                bloodBank: bloodBank
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
exports.getBloodBank = getBloodBank;
