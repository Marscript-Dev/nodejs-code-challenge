import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/User";
const validateToken = async (req:Request, res:Response,next:NextFunction)=>{
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader){
        return res.status(401).json({
            error: true,
            message: "Access token is missing",
        });
    }    
    try {
        const verify=jwt.verify(authorizationHeader.split(' ')[1], process.env.SECRET!);
        if(verify){
            const payload = verify as jwt.JwtPayload;
            const userId=Number(payload._id);
            const user = await getUserById(+userId);
            if(user==null){
                res.status(401).json({
                    error: true,
                    message: "user does not match",
                });
                return;
            }
            next();
        }
        else {
            res.status(401).json({
                error: true,
                message: "Access token is missing",
            });
            return;
        }
    }
    catch(err){
        res.status(401).json({
            error: true,
            message: "The token is not in the correct format",
        });
        return;
    }
    
}
const getUserId = (req:Request): number =>{
    const authorizationHeader = req.headers.authorization;
    const verify=jwt.verify(authorizationHeader!.split(' ')[1], process.env.SECRET!) as jwt.JwtPayload;
    return Number(verify._id);
}
export { getUserId }
export default validateToken;
