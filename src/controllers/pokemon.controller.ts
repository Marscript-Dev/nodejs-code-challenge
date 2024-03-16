import { Request, Response } from 'express';
import { createTResult } from '../core/DTO/TResult';
import {
  PokemonRegisterDTO,
  PokemonResponseDTO,
} from '../core/DTO/pokemons/pokemon.dto';
import {
  pokemonTransformer,
  pokemonsTransformer,
} from '../core/transformers/pokemon.transformer';
import {
  createPokemon,
  getAllPokemonByUserId,
} from '../services/pokemon.service';
import { findUserByUUID } from '../services/user.service';

export const create = async (req: Request, res: Response) => {
  try {
    const pokemon = req.body as PokemonRegisterDTO;
    const userId = req.params.userId;
    const newPokemon = await createPokemon(pokemon, Number(userId));

    if (!newPokemon)
      return res
        .status(500)
        .json(createTResult(null, ['Error creating pokemon']));

    res
      .status(201)
      .json(createTResult<PokemonResponseDTO>(pokemonTransformer(newPokemon)));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await findUserByUUID(userId);

    if (!user)
      return res
        .status(404)
        .json(
          createTResult<PokemonResponseDTO>({} as PokemonResponseDTO, [
            'User not found',
          ])
        );

    const pokemons = await getAllPokemonByUserId(user.id);

    res
      .status(200)
      .json(createTResult<PokemonResponseDTO[]>(pokemonsTransformer(pokemons)));
  } catch (error) {
    res.status(500).json(error);
  }
};
