"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticate(request, res, next) {
    try {
        const token = request.headers['x-access-token'];
        console.log(token);
        if (!token || typeof token !== 'string') {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Token not found"
            });
        }
        const payload = jsonwebtoken_1.default.verify(token, 'bloodbank');
        if (!payload) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Invalid token , user is auothorized"
            });
        }
        console.log(payload);
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
}
exports.isAuthenticate = isAuthenticate;
