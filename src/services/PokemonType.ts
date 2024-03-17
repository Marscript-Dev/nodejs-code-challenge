import prisma from '../lib/prisma';
import { IPokemonType } from "../models/PokemonType";
const insertPokemonType = async ( {Id, TypeId}: IPokemonType) => {
    return await prisma.pokemonType.create({        
        data:{
            PokemonId: Id,
            TypeId: TypeId
        },
    });
}
export {insertPokemonType}