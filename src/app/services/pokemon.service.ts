import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Pokemon} from '../models/pokemon.model'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

  constructor(private http: HttpClient) {}

  getPokemon(id: string){
     let response = this.http.get<Pokemon>(this.apiUrl+id)
     return response
  }
  
}
