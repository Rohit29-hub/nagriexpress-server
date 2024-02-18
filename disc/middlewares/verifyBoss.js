"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBoss = void 0;
const verifyBoss = (req, res, next) => {
    const { code } = req.body;
    if (code != process.env.BOSS_SECRET) {
        return res.status(301).json({
            message: "access failed",
            success: false
        });
    }
    next();
};
exports.verifyBoss = verifyBoss;
