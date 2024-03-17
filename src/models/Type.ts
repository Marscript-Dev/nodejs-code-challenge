import { IPokemonType } from './PokemonType';

export interface IType {
    Id:             number;
    Name:           string;
    CreationDate:   Date;
    PokemonType:    IPokemonType[];
}