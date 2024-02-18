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
exports.verifyAdminAndGiveToken = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const ApiResponse_1 = require("../utils/ApiResponse");
const jwt_1 = require("./jwt");
const verifyAdminAndGiveToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_model_1.default.findOne({
            email: req.body.email,
        });
        if (!admin) {
            throw new Error("Admin not found !");
        }
        const isPasswordCorrect = admin.comparePassword(req.body.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid Credentials");
        }
        const { accessToken } = (0, jwt_1.signRefreshandAccessToken)({ id: admin.id, email: admin.email });
        res.cookie("ngadmintokenaccess", accessToken, {
            secure: true
        }).json(new ApiResponse_1.ApiResponse(200, "Login successfully.", {
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
exports.verifyAdminAndGiveToken = verifyAdminAndGiveToken;
