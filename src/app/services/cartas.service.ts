import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  apiUrl = "https://api-tpi-production.up.railway.app/api/cards/"

  constructor(private http: HttpClient) { }

  getUserCards(id: number){
    let response = this.http.get(this.apiUrl+id)

    return response
  }
}
