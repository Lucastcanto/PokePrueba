import { Injectable, booleanAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = "https://api-tpi-production.up.railway.app/api/users"
  constructor(private http: HttpClient) { }

  addUser(email: string, password: string, name: string, apellido: string){
    let headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
    let body =  JSON.stringify({
                  nombre: name,
                  apellido: apellido,
                  email: email,
                  contrasenia: password
              })
              
    let response = this.http.post(this.apiUrl, body, {headers})

    return response
  }
}
