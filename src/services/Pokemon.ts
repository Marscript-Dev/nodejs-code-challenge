// Importar Prisma para interactuar con la base de datos
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Función para agregar un Pokémon a la colección de un usuario
export const addPokemonToUser = async (userId: number, pokemonName: string, pokemonType: string) => {
  try {
    const pokemon = await prisma.pokemon.create({
      data: {
        pokemon_name: pokemonName,
        type: pokemonType,
        user_id: userId
      },
    });
    return pokemon;
  } catch (error) {
    throw new Error('Error al agregar el Pokémon');
  }
};

// Función para obtener todos los Pokémon de un usuario
export const getAllUserPokemons = async (userId: number) => {
  try {
    const pokemons = await prisma.pokemon.findMany({
      where: { user_id: userId },
    });
    return pokemons;
  } catch (error) {
    throw new Error('Error al obtener los Pokémon del usuario');
  }
};

// Función para obtener un Pokémon por su ID
export const getPokemonById = async (pokemonId: number) => {
  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { pokemon_id: pokemonId },
    });
    return pokemon;
  } catch (error) {
    throw new Error('Error al obtener información del Pokémon');
  }
};

// Función para agregar un Pokémon a la colección de un usuario
export const addPokemonToFavorites = async (userId: number, pokemonId: number) => {
  try {
    const pokemon = await prisma.favorite.create({
      data: {
        pokemon_id: pokemonId,
        user_id: userId
      },
    });
    return pokemon;
  } catch (error) {
    throw new Error('Error al agregar el Pokémon');
  }
};

//Eliminar Pokemon
export const deletePokemonById = async (PokemonId: number, UserId: number) => {
    try {
      const deletedPokemon = await prisma.pokemon.delete({
        where: { pokemon_id : PokemonId, user_id : UserId },
      });
      return deletedPokemon;
    } catch (error) {
      throw new Error('Error al eliminar el Pokémon');
    }
  };