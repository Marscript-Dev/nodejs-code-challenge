import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/User';
const registerUser = async ({ Name, Email, Password } : IUser ) => {
    
    Password = bcrypt.hashSync(Password, 10);
    return await prisma.user.create({ 
        data:{ 
            Name,
            Email,
            Password
        }
    });
}
const getUserByEmail= async (Email: string)=>{
    return await prisma.user.findUnique({
        where:{
            Email: Email
        }
    }) as IUser;
}
const getUserById= async (Id: number)=>{
    return await prisma.user.findUnique({
        where:{
            Id
        }
    }) as IUser;
}
export { registerUser, getUserByEmail, getUserById };