"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const jwt_1 = require("../config/jwt");
const authAdmin = (req, res, next) => {
    const adminToken = req.cookies.ngadmintokenaccess;
    try {
        if (!adminToken)
            throw new Error("Token is required !");
        const admin = (0, jwt_1.verifyJwtToken)(adminToken);
        if (!admin)
            throw new Error("Token expired!, Login again please");
        next();
    }
    catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        });
    }
};
exports.authAdmin = authAdmin;
