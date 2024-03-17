import { IPokemon } from "./Pokemon";
import { IType } from "./Type";

export interface IPokemonType {
    Id:             number;
    PokemonId:      number;
    TypeId:         number;
    CreationDate:   Date;
    Pokemon?:        IPokemon;
    Type?:           IType;
}