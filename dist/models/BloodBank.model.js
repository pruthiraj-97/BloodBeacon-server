"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const defaultBloodGroups = () => {
    return new Map([
        ['A+', 0],
        ['A-', 0],
        ['B+', 0],
        ['B-', 0],
        ['AB+', 0],
        ['AB-', 0],
        ['O+', 0],
        ['O-', 0]
    ]);
};
const bloodBankSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contactNumber: {
        type: Number,
        require: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
        }
    },
    address: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'address'
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    bloodGroups: {
        type: Map,
        default: defaultBloodGroups
    },
    appointments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Appointment'
        }]
}, { timestamps: true });
bloodBankSchema.index({ location: '2dsphere' });
const BloodBank = mongoose_1.default.model('bloodBank', bloodBankSchema);
exports.default = BloodBank;
