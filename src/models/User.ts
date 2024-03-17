import { IPokemon } from "./Pokemon";

export interface IUser {
    Id:               number;
    Name:             string;
    Email:            string;
    Password:         string;
    CreationDate:     Date;
    Pokemons:         IPokemon[]
}