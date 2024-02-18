import { Request,NextFunction,Response } from "express";

export const verifyBoss = (req: Request, res: Response, next: NextFunction) => {
    const {code} = req.body;
    if(code != process.env.BOSS_SECRET!){
        return res.status(301).json({
            message: "access failed",
            success: false
        })
    }
    next();
}   