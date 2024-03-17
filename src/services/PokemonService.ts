import axios, { AxiosError } from 'axios';
import { Prisma, PrismaClient } from '@prisma/client';
import { IPokemon } from '../models/Pokemon';
import { IPokemon as PokemonModel}  from '../models/apiModels/pokemon';
import { Console } from 'console';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const prisma = new PrismaClient();

// Obtener un Pokémon del Api
export const getApiPokemon = async (pokemon: string, userId: number) => {
  try{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(response.status !== 200) {
      return null;
    }
    const pokemonResponse = response.data as PokemonModel;
    const pokemonModel : IPokemon = {
      user_pokemon_id: -1,
      pokemon_id: pokemonResponse.id,
      pokemon_name: pokemonResponse.name,
      user_id: userId
    };

    return pokemonModel;

  }  catch (error) {
    return null;
  }
};

// Función para agregar un Pokémon a la colección de un usuario
export const addPokemonToUser = async (pokemon: IPokemon) => {
  try {
    const pokemonAdd = await prisma.pokemon.create({
      data: {
        pokemon_id: pokemon.pokemon_id,
        pokemon_name: pokemon.pokemon_name,
        user_id: pokemon.user_id
      },
    });
    return pokemonAdd;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error('Pókemon duplicado');
    }
    else{
      throw new Error('Error al agregar el Pokémon');
    }    
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

// Función para obtener un Pokémon de la colección de un usuario por su ID
export const getPokemonById = async (pokemonId: number, userId: number) => {
  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { pokemon_id_user_id: {pokemon_id: pokemonId, user_id: userId}},
    });
    return pokemon;
  } catch (error) {
    throw new Error('Error al obtener información del Pokémon');
  }
};

// Función para agregar un Pokémon a favoritos
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

// Función para obtener todos los Pokémon Favoritos de un usuario
export const getAllUserFavoritesPokemons = async (userId: number) => {
  try {
    const pokemons = await prisma.favorite.findMany({
      where: { user_id: userId },
    });
    return pokemons;
  } catch (error) {
    throw new Error('Error al obtener los Pokémon Favoritos del usuario');
  }
};

// Función para obtener un Pokémon Favorito de un usuario por su ID
export const getFavoritePokemonById = async (pokemonId: number, userId: number) => {
  try {
    const pokemon = await prisma.favorite.findMany({
      where: { pokemon_id: pokemonId, user_id: userId},
    });
    return pokemon;
  } catch (error) {
    throw new Error('Error al obtener información del Pokémon');
  }
};

//Eliminar Pokemon de la colección
export const deletePokemonById = async (PokemonId: number, UserId: number) => {
    try {
      const deletedPokemon = await prisma.pokemon.deleteMany({
        where: { pokemon_id : PokemonId, user_id : UserId },
      });
      return deletedPokemon;
    } catch (error) {
      throw new Error('Error al eliminar el Pokémon');
    }
  };

  //Eliminar Pokemon de Favoritos
export const deleteFavoritePokemonById = async (PokemonId: number, UserId: number) => {
  try {
    const deletedPokemon = await prisma.favorite.deleteMany({
      where: { pokemon_id : PokemonId, user_id : UserId },
    });
    return deletedPokemon;
  } catch (error) {
    throw new Error('Error al eliminar el Pokémon');
  }
};