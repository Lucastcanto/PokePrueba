import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = "https://api-tpi-production.up.railway.app/api/users"

  constructor(private http:HttpClient) { }

  updatePokeballs(id:string, pokeballs: number){
    let headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
    let body = JSON.stringify({
      pokebolas: pokeballs
  })
    let response = this.http.patch(this.apiUrl+"/"+id, body, {headers})

    return response
  }
}

