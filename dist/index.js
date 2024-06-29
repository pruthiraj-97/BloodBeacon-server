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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const socket_1 = require("./routers/socket");
const auth_1 = __importDefault(require("./routers/auth"));
const BloodBank_1 = __importDefault(require("./routers/BloodBank"));
const BloodBankSearch_1 = __importDefault(require("./routers/BloodBankSearch"));
const messages_1 = __importDefault(require("./routers/messages"));
const notification_1 = __importDefault(require("./routers/notification"));
const redis_1 = __importDefault(require("./utils/redis"));
dotenv_1.default.config();
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
socket_1.app.use('/api/auth', auth_1.default);
socket_1.app.use('/api/bloodbank', BloodBank_1.default);
socket_1.app.use('/api/userbloodbank', BloodBankSearch_1.default);
socket_1.app.use('/api/messages', messages_1.default);
socket_1.app.use('/api/notification', notification_1.default);
socket_1.app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.default.get("ti");
    res.send('well come blood-beaconserver my server');
}));
socket_1.app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
(0, db_1.connectDB)();
