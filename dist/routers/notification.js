"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../controllers/notification");
const router = (0, express_1.Router)();
router.post('/sendnotification', notification_1.sendNotification);
exports.default = router;
