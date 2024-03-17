// Importar Prisma para interactuar con la base de datos
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPokemonTypes = async () => {
  try {
    const pokemonTypes = await prisma.type.findMany();
    return pokemonTypes;
  } catch (error) {
    throw new Error('Error al obtener los tipos de Pokémon');
  }
};

export const getPokemonTypeById = async (typeId: number) => {
  try {
    const pokemonType = await prisma.type.findUnique({
      where: { id: typeId },
    });
    return pokemonType;
  } catch (error) {
    throw new Error('Error al obtener información del tipo de Pokémon');
  }
};

export const createPokemonType = async (typeName: string) => {
  try {
    const pokemonType = await prisma.type.create({
      data: {
        name: typeName,
      },
    });
    return pokemonType;
  } catch (error) {
    throw new Error('Error al crear el tipo de Pokémon');
  }
};