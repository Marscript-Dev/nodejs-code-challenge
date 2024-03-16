import { Request, Response } from 'express';
import { createTResult } from '../core/DTO/TResult';
import { favoritesPokemonTransformer } from '../core/transformers/pokemon.transformer';
import {
  addToFavorites,
  getFavoritePokemonByUserIdAndPokemonId,
  getFavorites,
  removeFromFavorites,
} from '../services/favorites.service';

export const add = async (req: Request, res: Response) => {
  try {
    const { pokemonId, userId } = req.params;

    console.log({ pokemonId, userId });

    const favorite = await getFavoritePokemonByUserIdAndPokemonId(
      Number(userId),
      Number(pokemonId)
    );

    if(favorite) return res.status(400).json(createTResult<boolean>(false, ['Pokemon already in favorites']));

    const newFavorite = await addToFavorites(Number(userId), Number(pokemonId));

    if (!newFavorite) return res.status(400).json(createTResult<boolean>(false, ['Error adding to favorites']));
    
    res.status(201).json(createTResult<boolean>(true));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { pokemonId, userId } = req.params;

    const favorite = await getFavoritePokemonByUserIdAndPokemonId(
      Number(userId),
      Number(pokemonId)
    );

    if (!favorite) return res.status(400).json(createTResult<boolean>(false, ['Pokemon not in favorites']));

    const removed = await removeFromFavorites(Number(userId), Number(pokemonId));

    if (!removed) return res.status(400).json(createTResult<boolean>(false, ['Error removing from favorites']));

    res.status(200).json(createTResult<boolean>(true));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const favorites = await getFavorites(Number(userId));

    res.status(200).json(createTResult(favoritesPokemonTransformer(favorites)));
  } catch (error) {
    res.status(500).json(error);
  }
};
