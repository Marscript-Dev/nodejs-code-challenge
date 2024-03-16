import { PrismaClient, PokemonTypesEnum } from '@prisma/client';

export const pokemonTypesSeed = async (prisma: PrismaClient) => {
  
  const pokemonTypesArray = Object.keys(PokemonTypesEnum);

  for (const type of pokemonTypesArray) {

    await prisma.pokemonTypes.upsert({
      where: { name: type },
      update: {},
      create: {
        name: type
      }
    });

  }

};
