import { IFavorite } from "./Favorite";
import { IPokemonType } from "./PokemonType";
import { IUser } from "./User";

export interface IPokemon {
    Id:                 number;
    PokemonId:          number;
    UserId:             number;
    Name:               string;
    Games:              string;
    Abilities:          string;   
    UpdatedDate?:       Date;  
    CreationDate?:      Date;
    User?:              IUser;
    Favorites?:         IFavorite[];
    PokemonType?:       IPokemonType[];
}