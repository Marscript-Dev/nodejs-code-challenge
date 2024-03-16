import { PrismaClient } from '@prisma/client';
import { pokemonTypesSeed } from './seeds/pokemonTypes';

const prisma = new PrismaClient();

async function main() {
  await pokemonTypesSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
