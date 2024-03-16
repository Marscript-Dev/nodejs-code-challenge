import axios from 'axios';
import { PokeApiPokemon } from '../models/poke-api.model';
import { createTResult } from '../DTO/TResult';

import { getConfig } from '../utils/config';

export const getPokemonInfoByName = async (name: string) => {
  try {

    const pokeApiUrl = getConfig('POKE_API_URL');    

    console.log(`${pokeApiUrl}/pokemon/${name}`);

    const response = await axios
      .get<PokeApiPokemon>(`${pokeApiUrl}/pokemon/${name}`)
      .catch((err) => {
        return null;
      });

    if (!response)
      return createTResult<PokeApiPokemon>({} as PokeApiPokemon, [
        'Pokemon not found',
      ]);

    return createTResult<PokeApiPokemon>(response.data);
  } catch (err) {
    console.log(err);
    return createTResult<PokeApiPokemon>({} as PokeApiPokemon, [
      'Poke api threw an error',
    ]);
  }
};
