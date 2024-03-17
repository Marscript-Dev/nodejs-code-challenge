import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as Auth from './AuthService';

//Models
import { IUser } from '../models/User';

export const registerUser = async (userNew: IUser) => {
  try {

    const hashedPassword = await Auth.hashPassword(userNew.user_password);

    const user = await prisma.user.create({
      data: {
        user_name: userNew.user_name,
        user_lastname: userNew.user_lastname,
        user_password : hashedPassword,
        user_email: userNew.user_email
      },
    });
    return user;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error('Usuario duplicado');
    }
    else{
      throw new Error('Error al registrar el usuario');
    }        
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_name: username },
    });
    return user;
  } catch (error) {
    throw new Error('Error al buscar el usuario');
  }
};

export const getUserByID = async (userId: number) : Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId } ,
    });
    return user;
  } catch (error) {
    throw new Error('Error al buscar el usuario');
  }
};