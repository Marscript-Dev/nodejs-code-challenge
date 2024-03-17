import prisma from '../lib/prisma';
const insertFavorite = async ( PokemonId: number, UserId: number ) => {
    return await prisma.favorite.create({        
        data:{
            PokemonId,
            UserId
        }
    });
}
const getFavorite = async ( PokemonId: number, UserId: number ) => {
    return await prisma.favorite.findUnique({ 
        where:{
            FavoriteId:{
                PokemonId:PokemonId,
                UserId: UserId
            }
        }
    });
}
export {insertFavorite, getFavorite}