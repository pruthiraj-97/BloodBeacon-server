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
exports.isAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticate(request, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = request.headers['x-access-token'];
            console.log(token);
            if (!token || typeof token != 'string') {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Token not found"
                });
            }
            console.log("token is ", process.env.JWT_SECRET);
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'bloodbank');
            console.log("payload is ", payload);
            if (!payload) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Invalid token , user is auothorized"
                });
            }
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Token expired",
                });
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Invalid token",
                });
            }
            else {
                return res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Internal server error: "
                });
            }
        }
    });
}
exports.isAuthenticate = isAuthenticate;
