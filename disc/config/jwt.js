"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshandAccessToken = exports.verifyJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signRefreshandAccessToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '60d'
    });
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    return {
        token,
        accessToken
    };
};
exports.signRefreshandAccessToken = signRefreshandAccessToken;
const verifyJwtToken = (token) => {
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!user) {
            throw new Error("Invalid token");
        }
        return user;
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
};
exports.verifyJwtToken = verifyJwtToken;
