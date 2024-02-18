import { NextFunction, Request , Response} from "express";
import { verifyJwtToken } from "../config/jwt";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const adminToken = req.cookies.ngadmintokenaccess

    try{
        const admin = verifyJwtToken(adminToken);
        if(!admin){
            throw new Error("Token expired!, Login again please");
        }
        next();
    }catch(err: any){
        return res.status(401).json({
            status: 401,
            message: "Unauthorized admin Access."
        })
    }
}
