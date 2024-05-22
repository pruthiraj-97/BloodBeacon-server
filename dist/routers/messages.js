"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const messages_1 = require("../controllers/messages");
const isAuthenticate_1 = require("../middleware/isAuthenticate");
router.post('/sendmessage/:id', isAuthenticate_1.isAuthenticate, messages_1.sendMessage);
router.get('/getconversation', isAuthenticate_1.isAuthenticate, messages_1.getMessage);
exports.default = router;
