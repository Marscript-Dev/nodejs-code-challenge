import { Favorites, Pokemon } from "@prisma/client";

export interface FavoritePokemon extends Favorites {
    pokemon: Pokemon;
}
