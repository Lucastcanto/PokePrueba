import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { carta } from '../models/carta.model';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  apiUrl = "https://api-tpi-production.up.railway.app/api/cards"

  constructor(private http: HttpClient) { }

  getUserCards(id: number){
    let response = this.http.get<carta[]>(this.apiUrl+"/"+id)

    return response
  }

  createCard(UserId:string, PokemonId: string){
    console.log(UserId+PokemonId)
    let headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
    let body =  JSON.stringify({
                  ownerID: UserId,
                  pokemonID: PokemonId
              })
    let response = this.http.post<carta>(this.apiUrl, body, {headers})
    return response
  }
}
