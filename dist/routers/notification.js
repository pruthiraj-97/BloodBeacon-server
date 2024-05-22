"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../controllers/notification");
const isAuthenticate_1 = require("../middleware/isAuthenticate");
const router = (0, express_1.Router)();
router.post('/sendnotification', isAuthenticate_1.isAuthenticate, notification_1.sendNotification);
exports.default = router;
