import { type } from './type.model'
import { sprites } from './sprite.model';
import { species } from './species.model';

export interface Pokemon {
    name: string;
    id: number;
    types: type[];
    descripcion: string;
    sprites: sprites;
    species: {
        name: string,
        url : string;
    };
}