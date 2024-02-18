import jwt from 'jsonwebtoken'

const signRefreshandAccessToken = (payload: object) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET!,{
        expiresIn: '60d'
    })

    const accessToken = jwt.sign(payload,process.env.JWT_SECRET!,{
        expiresIn: '2h'
    })

    return {
        token,
        accessToken
    };
}

export const verifyJwtToken = (token: string) => {
    try {
        const user = jwt.verify(token,process.env.JWT_SECRET!);
        
        if(!user){
            throw new Error("Invalid token");
        }

        return user;

    } catch (error: any) {
        console.log(error);
        return error.message;
    }
}



export {signRefreshandAccessToken}
