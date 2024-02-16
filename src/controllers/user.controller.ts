import { ApiResponse } from "../utils/ApiResponse";
import { Request,Response } from "express";
import { signRefreshandAccessToken } from "../config/jwt";
import userModel from "../modals/user.model";

export const options  = {
    httpOnly : true,
    secure: true
}

const register = async (req: Request,res: Response) => {
    try{
        for(let fields in req.body){
            if(req.body[fields] == ''){
                throw new Error(`${fields} is empty .`)
            }
        }

        const existedUser = await userModel.findOne({ email : req.body.email})

        if (existedUser) {
            throw new Error("User with email already exists");
        }

        const user = await new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        })
        
        const {_id,email} = user;

        const {token,accessToken} = signRefreshandAccessToken({_id,email})
        user.refreshToken = token;
        
        await user.save();

        res.cookie("accessToken",accessToken,options).json(
            new ApiResponse(200, "success",{ user: user._id })
        )

    }catch(err: any){
        console.log(err.message);
        return res.status(409).json({
            message: err.message,
            success: false
        })
    }
}

const login = async (req: Request,res: Response) => {
    // email and password comes with res.body;
    const {email,password} = req.body;

    // check email is persent on database
    const user = await userModel.findOne({
        email
    }) as any

    if(!user){
        return res.status(301).json({
            message: 'User not find .',
            success: false
        })
    }

    const verifyPassword = await user.comparePassword(password);

    if(!verifyPassword){
        res.status(401).json({
            message: 'Invalid Credentials',
            success: false
        })
    }

    const {token,accessToken} = signRefreshandAccessToken({id: user._id,email: user.email});
    await userModel.findOneAndUpdate(user._id, { refreshToken: token }, { new: true });

    res.cookie("accessToken",accessToken,options).json(
        new ApiResponse(200,"success",{
            message: 'Your logged in Successfully'
        })
    )
}


export {
    register,
    login
}