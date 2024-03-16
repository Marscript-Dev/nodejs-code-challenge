import { UserRegisterDTO } from '../core/DTO/users/user.dto';
import { prismaClient } from './../core/config/database';

export const findUserbyUsername = async (username: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (user: UserRegisterDTO) => {
  try {
    
    const newUser = await prismaClient.user.create({
      data: user,
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

export const findUserByUUID = async (uuid: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        uuid,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}