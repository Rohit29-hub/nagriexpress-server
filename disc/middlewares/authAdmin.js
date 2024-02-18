"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const authAdmin = (req, res, next) => {
    const adminToken = req.headers['x-admin'];
    console.log(adminToken);
    console.log(typeof adminToken);
    if (adminToken != "true") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized admin Access."
        });
    }
    next();
};
exports.authAdmin = authAdmin;
