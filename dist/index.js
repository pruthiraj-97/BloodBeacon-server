"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const auth_1 = __importDefault(require("./routers/auth"));
const BloodBank_1 = __importDefault(require("./routers/BloodBank"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL
}));
app.use('/api/auth', auth_1.default);
app.use('/api/bloodbank', BloodBank_1.default);
app.get('/', (req, res, next) => {
    res.send('well come to my server');
});
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
(0, db_1.connectDB)();
