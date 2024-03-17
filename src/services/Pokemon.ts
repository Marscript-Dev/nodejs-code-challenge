import prisma from '../lib/prisma';
import { IPokemon } from '../models/Pokemon';
const getPokemons = async (UserId: number) => {
    return await prisma.pokemon.findMany({
        where:{
            UserId
        }
    }) as IPokemon[];
    
}
const getPokemonByName = async (Name: string, UserId: Number) : Promise<IPokemon|null> => {
    const PokemonId=isNaN(+Name)?-1:+Name;
    return await prisma.pokemon.findFirst({
        where:{
            OR:[
                {
                    Name: {contains:Name},
                    UserId: +UserId
                },
                {
                    PokemonId,
                    UserId: +UserId
                }
            ]
        },
    }) as IPokemon;
    
}
const getPokemonFromApi = async (Name: string): Promise<Response> =>{    
    return (await fetch(`https://pokeapi.co/api/v2/pokemon/${Name}`));
    
}
const insertPokemon = async ({PokemonId, Name, UserId, Abilities, Games }: IPokemon)=>{
    return await prisma.pokemon.create({
        data:{
            PokemonId,
            Name,
            UserId,
            Abilities,
            Games
        }
    })
}
export { getPokemons, getPokemonFromApi, insertPokemon, getPokemonByName};