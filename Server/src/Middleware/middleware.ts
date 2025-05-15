import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

interface customRequest extends Request{
     user?: {
    id?: string;
    email?: string;
  };
}

const JWT_SECRET=process.env.JWT_SECRET
if(!JWT_SECRET){
    throw new Error('JWT_SCREZT not found')
}

export const authenticationToken=(req:customRequest,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization
    console.log("token in middleware :   ",token)
    if (!token){
        res.status(401).json({msg:'Token not found'})
        return ;
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET)  as { id: string };
        
        req.user=decoded;
        next()
    } catch (error) {
        res.status(500).json({msg:"INternal middleware err"})
    }
}
