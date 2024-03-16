import { prismaClient } from '../core/config/database';

export const addToFavorites = async (userId: number, pokemonId: number) => {
  try {
    const favorite = await prismaClient.favorites.create({
      data: {
        userId,
        pokemonId,
      },
    });
    return favorite;
  } catch (error) {
    throw error;
  }
};


export const removeFromFavorites = async (userId: number, pokemonId: number) => {
  try {
    const favorite = await prismaClient.favorites.delete({
        where:{
            userId: userId,
            pokemonId: pokemonId
        }
    });
    return favorite;
  } catch (error) {
    throw error;
  }
};

export const getFavorites = async (userId: number) => {
  try {
    const favorites = await prismaClient.favorites.findMany({
      where: {
        userId,
      },
      include: {
        pokemon: true,
      },
    });
    return favorites;
  } catch (error) {
    throw error;
  }
}


export const getFavoritePokemonByUserIdAndPokemonId = async (userId: number, pokemonId: number) => {
  try {
    const favorite = await prismaClient.favorites.findFirst({
      where: {
        userId,
        pokemonId,
      },
    });
    return favorite;
  } catch (error) {
    throw error;
  }
}