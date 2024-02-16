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
exports.login = exports.register = exports.options = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const jwt_1 = require("../config/jwt");
const user_model_1 = __importDefault(require("../modals/user.model"));
exports.options = {
    httpOnly: true,
    secure: true
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let fields in req.body) {
            if (req.body[fields] == '') {
                throw new Error(`${fields} is empty .`);
            }
        }
        const existedUser = yield user_model_1.default.findOne({ email: req.body.email });
        if (existedUser) {
            throw new Error("User with email already exists");
        }
        const user = yield new user_model_1.default({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        const { _id, email } = user;
        const { token, accessToken } = (0, jwt_1.signRefreshandAccessToken)({ _id, email });
        user.refreshToken = token;
        yield user.save();
        res.cookie("accessToken", accessToken, exports.options).json(new ApiResponse_1.ApiResponse(200, "success", { user: user._id }));
    }
    catch (err) {
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // email and password comes with res.body;
    const { email, password } = req.body;
    // check email is persent on database
    const user = yield user_model_1.default.findOne({
        email
    });
    if (!user) {
        return res.status(301).json({
            message: 'User not find .',
            success: false
        });
    }
    const verifyPassword = yield user.comparePassword(password);
    if (!verifyPassword) {
        res.status(401).json({
            message: 'Invalid Credentials',
            success: false
        });
    }
    const { token, accessToken } = (0, jwt_1.signRefreshandAccessToken)({ id: user._id, email: user.email });
    yield user_model_1.default.findOneAndUpdate(user._id, { refreshToken: token }, { new: true });
    res.cookie("accessToken", accessToken, exports.options).json(new ApiResponse_1.ApiResponse(200, "success", {
        message: 'Your logged in Successfully'
    }));
});
exports.login = login;
