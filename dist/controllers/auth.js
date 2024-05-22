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
exports.login = exports.VarifyUser = exports.signUp = void 0;
const auth_1 = require("../Types/auth");
const zod_validation_error_1 = require("zod-validation-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dataValidationError_1 = require("../config/dataValidationError");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contactNumber: parseInt(req.body.contactNumber),
                bloodGroup: req.body.bloodGroup.trim()
            };
            const typeResult = auth_1.userSignUp.safeParse(user);
            if (!typeResult.success) {
                const response = (0, zod_validation_error_1.fromZodError)(typeResult.error);
                const message = (0, dataValidationError_1.dataValidationError)(response.details);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: message
                });
            }
            // const isUserExist=await userSchema.findOne({
            //     $or:[
            //         {email:user.email},
            //         {contactNumber:user.contactNumber}
            //     ]
            // })
            // if(isUserExist){
            //     return res.status(400).json({
            //         success:false,
            //         message:"user already exist , please enter a new email or contact number"
            //     })
            // }
            const generateOtp = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false,
                lowerCaseAlphabets: false
            });
            console.log(generateOtp);
            const otp = parseInt(generateOtp);
            const hashPassword = yield bcryptjs_1.default.hash(user.password, 10);
            user.password = hashPassword;
            const newUser = yield user_model_1.default.create(Object.assign(Object.assign({}, user), { varificationCode: otp }));
            // await sendEmail(newUser.email,newUser.name,otp)
            return res.status(200).json({
                status: 200,
                success: true,
                message: "user created successfully"
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
}
exports.signUp = signUp;
function VarifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, verificationCode } = req.body;
            const userExist = yield user_model_1.default.findOne({ email });
            if ((userExist === null || userExist === void 0 ? void 0 : userExist.varificationCode) != parseInt(verificationCode)) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "invalid otp"
                });
            }
            yield user_model_1.default.updateOne({
                email: userExist === null || userExist === void 0 ? void 0 : userExist.email
            }, {
                $set: {
                    isVarified: true
                }
            });
            return res.status(200).json({
                status: 200,
                success: true,
                message: "user varified"
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
}
exports.VarifyUser = VarifyUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginData = {
                email: req.body.email,
                password: req.body.password
            };
            const varifyResult = auth_1.userLogin.safeParse(loginData);
            if (!varifyResult.success) {
                const errorMessage = (0, zod_validation_error_1.fromZodError)(varifyResult.error);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: errorMessage
                });
            }
            const userExist = yield user_model_1.default.findOne({ email: loginData.email });
            if (!userExist) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: ["user not found"]
                });
            }
            // if(!userExist.isVarified){
            //     return res.status(400).json({
            //         success:false,
            //         message:"user not varified"
            //     })
            // }
            const paswordVerify = yield bcryptjs_1.default.compare(loginData.password, userExist.password);
            if (!paswordVerify) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: ["invalid password"]
                });
            }
            const payload = {
                id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                contactNumber: userExist.contactNumber,
                bloodGroup: userExist.bloodGroup
            };
            const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            const response = res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 60 * 60 * 1000)
            })
                .status(200)
                .json({
                status: 200,
                success: true,
                message: "login successfully",
                token
            });
            return response;
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: error
            });
        }
    });
}
exports.login = login;
