import { Pokemon } from "@prisma/client";
import { PokemonResponseDTO } from "../DTO/pokemons/pokemon.dto";
import { FavoritePokemon } from "../models/favorites.model";

export const pokemonTransformer = (pokemon:Pokemon):PokemonResponseDTO => {
    return {
        uuid: pokemon.uuid,
        name: pokemon.name,
        type: pokemon.type,
        nickname: pokemon.nickname,
        level: pokemon.level,
        pokemonId: pokemon.pokemonId,
    }
}

export const pokemonsTransformer = (pokemons:Pokemon[]):PokemonResponseDTO[] => {
    return pokemons.map((pokemon) => pokemonTransformer(pokemon))
}


export const favoritesPokemonTransformer = (favorites:FavoritePokemon[]):PokemonResponseDTO[] => {
    return favorites.map((favorite) => pokemonTransformer(favorite.pokemon))
}