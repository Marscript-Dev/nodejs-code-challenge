import express from 'express';
import { createTResult } from '../DTO/TResult';
import { PokemonRegisterDTO } from '../DTO/pokemons/pokemon.dto';
import { getPokemonInfoByName } from '../services/pokeApi.service';

export default async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const pokemon = req.body as PokemonRegisterDTO;
    
    const pokemonInfo = await getPokemonInfoByName(pokemon.name);

    if (!pokemonInfo.success)
      return res.status(404).json(createTResult(null, ['Pokemon not found']));

    req.body = {
      ...pokemon,
      pokemonId: pokemonInfo.data.id,
    };
    next();
  } catch (error) {
    return res
      .status(401)
      .json(createTResult(null, ['Invalid token or token expired']));
  }
}
