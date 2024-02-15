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
exports.login = exports.register = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const user_model_1 = __importDefault(require("../modals/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            throw new Error("Empty Body detected !");
        }
        const user = yield new user_model_1.default({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            refreshToken: req.body.refreshToken,
        });
        yield user.save();
        res.json(new ApiResponse_1.ApiResponse(200, "success", {
            user: user._id
        }));
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.register = register;
const login = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.login = login;
