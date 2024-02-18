import { Request, Response } from "express"
import adminModel from "../models/admin.model"
import { ApiResponse } from "../utils/ApiResponse"
import { signRefreshandAccessToken } from "./jwt"

export const verifyAdminAndGiveToken = async (req:Request, res: Response) => {
    try{
        const admin = await adminModel.findOne({
            email: req.body.email,
        }) as any

        if(!admin){
            throw new Error("Admin not found !")
        }

        const isPasswordCorrect = admin.comparePassword(req.body.password);

        if(!isPasswordCorrect){
            throw new Error("Invalid Credentials")
        }

        const {accessToken} = signRefreshandAccessToken({id: admin.id, email: admin.email})
        
        res.cookie("ngadmintokenaccess",accessToken,{
            secure: true
        }).json(
            new ApiResponse(200,"Login successfully.",{
                data: null
            })
        )

    }catch(err: any){
        return res.status(401).json({
            message: err.message,
            success: false
        })
    }
}