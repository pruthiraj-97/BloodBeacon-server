"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BloodBank_1 = require("../controllers/BloodBank");
const router = (0, express_1.Router)();
router.get('/getbloodbank/:id', BloodBank_1.getBloodBank);
router.post('/registerbloodbank', BloodBank_1.registerBloodBank);
router.put('/updatebloodgroup/:id', BloodBank_1.setBloodGroups);
exports.default = router;
