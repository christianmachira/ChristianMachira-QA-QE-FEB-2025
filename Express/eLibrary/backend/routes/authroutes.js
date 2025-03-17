"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authcontroller_1 = require("../controllers/authcontroller");
const router = (0, express_1.Router)();
router.post('/register', authcontroller_1.createuser);
router.post('/login', authcontroller_1.loginuser);
router.post('/logout', authcontroller_1.logoutuser);
exports.default = router;
