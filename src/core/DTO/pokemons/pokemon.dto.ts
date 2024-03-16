import { PokemonTypesEnum } from '@prisma/client';

export interface PokemonDTO {
  name: string;
  type: PokemonTypesEnum;
  nickname: string;
  level: number;
  pokemonId: number;
}

export interface PokemonResponseDTO extends PokemonDTO {
  uuid: string;
}

export interface PokemonRegisterDTO extends PokemonDTO {
  userId: string;
}
