import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as User from  '../services/UserService';
import { IUser } from '../models/User';
import { verify } from 'crypto';


const JWT_SECRET = '123456';

export const authenticateToken = async (req: Request, res: Response, next: () => void) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const Verify = jwt.verify(token, JWT_SECRET!);
    if(Verify){
        const user = await getUser(req, res);        
        if(user===null){
            return res.sendStatus(401);
        }else{
            next();
        }
    }else{
        return res.sendStatus(401);
    }
};

export const getUser = async (req: Request, res: Response) : Promise<IUser> => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    const Verify = jwt.verify(token!, JWT_SECRET!) as jwt.JwtPayload;

    const user = await User.getUserByID(Verify.userId)!;

    return user!;
}

export const getToken = (user: IUser) : string => {

    const accessToken = jwt.sign({ userId: user.user_id }, JWT_SECRET);

    return accessToken;
};

