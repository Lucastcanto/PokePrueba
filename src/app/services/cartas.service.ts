import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { carta } from '../models/carta.model';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  apiUrl = "https://api-tpi-production.up.railway.app/api/cards/"

  constructor(private http: HttpClient) { }

  getUserCards(id: number){
    let response = this.http.get<carta[]>(this.apiUrl+id)

    return response
  }
}
