import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "https://api-tpi-production.up.railway.app/api/login/"
  private apiUrlId = "https://api-tpi-production.up.railway.app/api/users/"

  constructor(private http: HttpClient) { }

  getUser(email: string){
    let response = this.http.get<User>(this.apiUrl+email)

     return response

  }

  getUserById(id: string){
    let response = this.http.get<User>(this.apiUrlId+id)

    return response

  }
}
