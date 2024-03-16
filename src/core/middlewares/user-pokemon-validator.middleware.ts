import express from 'express';
import { findPokemonByUUID } from '../../services/pokemon.service';
import { findUserByUUID } from '../../services/user.service';
import { createTResult } from '../DTO/TResult';

export default async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { pokemonId, userId } = req.params;

    const user = await findUserByUUID(userId);
    if (!user)
      return res.status(404).json(createTResult(null, ['User not found']));

    const pokemon = await findPokemonByUUID(pokemonId);
    if (!pokemon)
      return res.status(404).json(createTResult(null, ['Pokemon not found']));

    if (pokemon.userId !== user.id)
      return res.status(401).json(createTResult(null, ['Unauthorized']));

    req.params.pokemonId = pokemon.id.toString();
    req.params.userId = user.id.toString();

    next();
  } catch (error) {
    return res
      .status(401)
      .json(createTResult(null, ['Invalid token or token expired']));
  }
}
