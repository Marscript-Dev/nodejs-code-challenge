import { IPokemon } from "./Pokemon";
import { IUser } from "./User";

export interface IFavorite {
    UserId:         number;
    PokemonId:      number;
    CreationDate:   Date;
    Pokemon:        IPokemon
    User:           IUser;
}