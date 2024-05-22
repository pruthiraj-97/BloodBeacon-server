"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchForBloodBank_1 = require("../controllers/searchForBloodBank");
const isAuthenticate_1 = require("../middleware/isAuthenticate");
const router = (0, express_1.Router)();
router.get('/searchbloodbank', isAuthenticate_1.isAuthenticate, searchForBloodBank_1.serchNearbyBloodBank);
exports.default = router;
