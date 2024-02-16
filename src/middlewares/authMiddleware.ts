import { Request,Response,NextFunction } from "express"
import { verifyJwtToken } from "../config/jwt"

export const authMiddleware = async (req: Request,res: Response,next: NextFunction ) => {
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({
            status: 401,
            message: "unauthorized"
        })
    }
    
    const response = verifyJwtToken(token);
    console.log(response);
    if(!response){
        return res.status(401).json({
            status: 401,
            message: "Expired Token"
        })
    }

    next();
}