"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const admin_controller_1 = require("../controllers/admin.controller");
const admin_controller_2 = require("../controllers/admin.controller");
const admin_controller_3 = require("../controllers/admin.controller");
const verifyBoss_1 = require("../middlewares/verifyBoss");
const verifyAdmin_1 = require("../config/verifyAdmin");
router.get('/alladmins', verifyBoss_1.verifyBoss, admin_controller_1.getAllAdmins);
router.post('/add/admin', verifyBoss_1.verifyBoss, admin_controller_2.addAdmin);
router.delete('/delete/admin', verifyBoss_1.verifyBoss, admin_controller_3.deleteAdmin);
router.post('/login/admin', verifyAdmin_1.verifyAdminAndGiveToken);
exports.default = router;
