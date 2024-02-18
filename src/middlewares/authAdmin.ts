import { NextFunction, Request , Response} from "express";
import { verifyJwtToken } from "../config/jwt";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const adminToken = req.cookies.ngadmintokenaccess
    try{
        if(!adminToken) throw new Error("Token is required !");
        const admin = verifyJwtToken(adminToken);

        if(!admin) throw new Error("Token expired!, Login again please");

        next();
    }catch(err: any){
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}
