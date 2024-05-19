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
exports.serchNearbyBloodBank = void 0;
const BloodBank_model_1 = __importDefault(require("../models/BloodBank.model"));
const calculatedistance_1 = require("../config/calculatedistance");
const zod_validation_error_1 = require("zod-validation-error");
const BloodBank_1 = require("../Types/BloodBank");
const dataValidationError_1 = require("../config/dataValidationError");
function serchNearbyBloodBank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const longitude = parseFloat(req.body.longitude);
            const latitude = parseFloat(req.body.latitude);
            const distance = parseInt(req.body.distance) || 20;
            const bloodGroup = req.body.bloodGroup;
            const result = BloodBank_1.searchBloodBankI.safeParse({
                longitude,
                latitude,
                bloodGroup,
                distance
            });
            if (!result.success) {
                const response = (0, zod_validation_error_1.fromZodError)(result.error);
                const message = (0, dataValidationError_1.dataValidationError)(response.details);
                return res.status(400).json({
                    success: false,
                    message: message
                });
            }
            const bloodBanks = yield BloodBank_model_1.default.find()
                .populate('address');
            let searchBloodBanks = [];
            bloodBanks.forEach((bloodbank) => {
                const bloodGroups = bloodbank.bloodGroups;
                if (bloodGroups.get(bloodGroup) == 0) {
                    return;
                }
                let coordinate = bloodbank.location.coordinates;
                const fetchDistance = (0, calculatedistance_1.calculateDistance)(latitude, longitude, coordinate[1], coordinate[0]);
                if (fetchDistance < distance) {
                    searchBloodBanks.push({
                        bloodbank: bloodbank,
                        distance: fetchDistance
                    });
                }
            });
            searchBloodBanks.sort((a, b) => a.distance - b.distance);
            return res.status(200).json({
                success: true,
                searchBloodBanks: searchBloodBanks
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
exports.serchNearbyBloodBank = serchNearbyBloodBank;
