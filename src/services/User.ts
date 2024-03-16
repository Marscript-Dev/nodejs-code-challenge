// Importar Prisma para interactuar con la base de datos
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const registerUser = async (username: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    throw new Error('Error al buscar el usuario');
  }
};