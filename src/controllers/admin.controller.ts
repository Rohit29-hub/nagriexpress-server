import { Request,Response } from "express";
import adminModel from "../models/admin.model";
import { ApiResponse } from "../utils/ApiResponse";



const getAllAdmins = (req: Request, res: Response) => {
    try{
        const admins = adminModel.find({});
        res.json(new ApiResponse(200, "data fetch successfully.", {
            success: true,
            data: admins
        }));
    }catch(err: any){
        return res.status(400).json({
            message: err.message,
            success: false
        })
    }
}

const addAdmin = async (req: Request, res: Response) => {
    try{
        const isPersent = await adminModel.findOne({
            email: req.body.email
        })

        if(isPersent){
            throw new Error("Admin already exits")
        }

        const newAdmin = await new adminModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })
        await newAdmin.save();
        res.json(
            new ApiResponse(200,"Admin add successfully.",{
                data: newAdmin._id
            })
        )
    }catch(err: any){
        return res.status(401).json({
            message: err.message,
            success: false
        })
    }
}

const deleteAdmin = async (req: Request, res: Response) => {
    const { adminId } = req.params;
    try{
        
        const admin = await adminModel.findOneAndDelete({
            _id: adminId
        })
        
        if(!admin){
            throw new Error("Admin not found !")
        }

        res.json(
            new ApiResponse(200,"Delete admin successfully.",{
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



export {
    getAllAdmins,
    addAdmin,
    deleteAdmin
}