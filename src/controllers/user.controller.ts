import { ApiResponse } from "../utils/ApiResponse";
import userModal from "../modals/user.model";

const register = async (req: any,res: any) => {
    try{
        if(!req.body){
            throw new Error("Empty Body detected !")
        }

        const user = await new userModal({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            refreshToken: req.body.refreshToken,
        })

        await user.save();

        res.json(
            new ApiResponse(
                200,
                "success",
                {
                    user: user._id
                }
            )
        )

    }catch(err: any){
        console.log(err.message);
    }
}

const login = async () => {

}


export {
    register,
    login
}