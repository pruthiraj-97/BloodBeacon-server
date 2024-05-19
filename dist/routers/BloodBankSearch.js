"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchForBloodBank_1 = require("../controllers/searchForBloodBank");
const router = (0, express_1.Router)();
router.get('/searchbloodbank', searchForBloodBank_1.serchNearbyBloodBank);
exports.default = router;
