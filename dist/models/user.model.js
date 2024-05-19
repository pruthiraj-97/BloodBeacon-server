"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Note use of document
//Document is a class that represents a single document in a MongoDB collection. 
// That inharited the property like _id,createdAt,updatedAt.and methods like save,remove,etc. for the use of Document.
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    contactNumber: {
        type: Number,
        require: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    bloodBank: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "bloodBank",
        default: null
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    requestMessages: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "requestMessage"
        }
    ],
    isVarified: {
        type: Boolean,
        default: false
    },
    varificationCode: {
        type: Number,
        required: true
    }
}, { timestamps: true });
userSchema.index({ location: '2dsphere' });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
