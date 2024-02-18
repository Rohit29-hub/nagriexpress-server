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
exports.deleteAdmin = exports.addAdmin = exports.getAllAdmins = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const ApiResponse_1 = require("../utils/ApiResponse");
const getAllAdmins = (req, res) => {
    try {
        const admins = admin_model_1.default.find({});
        res.json(new ApiResponse_1.ApiResponse(200, "data fetch successfully.", {
            success: true,
            data: admins
        }));
    }
    catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false
        });
    }
};
exports.getAllAdmins = getAllAdmins;
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isPersent = yield admin_model_1.default.findOne({
            email: req.body.email
        });
        if (isPersent) {
            throw new Error("Admin already exits");
        }
        const newAdmin = yield new admin_model_1.default({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });
        yield newAdmin.save();
        res.json(new ApiResponse_1.ApiResponse(200, "Admin add successfully.", {
            data: newAdmin._id
        }));
    }
    catch (err) {
        return res.status(401).json({
            message: err.message,
            success: false
        });
    }
});
exports.addAdmin = addAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    try {
        const admin = yield admin_model_1.default.findOne({
            _id: adminId
        });
        if (!admin) {
            throw new Error("Admin not found !");
        }
        yield admin_model_1.default.findOneAndDelete({
            _id: adminId
        });
        res.json(new ApiResponse_1.ApiResponse(200, "Delete admin successfully.", {
            data: null
        }));
    }
    catch (err) {
        return res.status(401).json({
            message: err.message,
            success: false
        });
    }
});
exports.deleteAdmin = deleteAdmin;
