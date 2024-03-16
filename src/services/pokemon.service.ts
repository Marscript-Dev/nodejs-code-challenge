import { PokemonRegisterDTO } from '../core/DTO/pokemons/pokemon.dto';
import { prismaClient } from '../core/config/database';

export const createPokemon = async (
  pokemon: PokemonRegisterDTO,
  userId: number
) => {
  try {
    const newPokemon = await prismaClient.pokemon.create({
      data: {
        ...pokemon,
        userId,
      },
    });
    return newPokemon;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllPokemonByUserId = async (userId: number) => {
  try {
    const pokemons = await prismaClient.pokemon.findMany({
      where: {
        userId,
      },
    });

    return pokemons;
  } catch (err) {
    throw err;
  }
};

export const findPokemonByUUID = async (uuid: string) => {
  try {
    const pokemon = await prismaClient.pokemon.findUnique({
      where: {
        uuid: uuid,
      },
    });
    return pokemon;
  } catch (err) {
    throw err;
  }
};
