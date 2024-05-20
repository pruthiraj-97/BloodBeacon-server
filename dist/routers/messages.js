"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const messages_1 = require("../controllers/messages");
router.post('/sendmessage/:id', messages_1.sendMessage);
router.get('/getconversation', messages_1.getMessage);
exports.default = router;
