import { Injectable } from '@angular/core';
import { LoginRequest } from '../loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
currentUserData: BehaviorSubject<User>=new BehaviorSubject<User>({id:0,email:"",password:""}); //ACA DEBERIA TRABAJARSE CON UN LOCAL STORAGE
  
constructor(private http:HttpClient) { }

login(credentials: LoginRequest): Observable<User> {
  return this.http.get<User>("././assets/data.json").pipe(
    catchError((error) => {
      if (error.status === 401) {
        return throwError(()=>new Error("Credenciales incorrectas."))
      } else {
        return throwError(()=>new Error("Algo fallo."))
      }
    })
  );
}


get userData():Observable<User>{
  return this.currentUserData.asObservable();
}
}
