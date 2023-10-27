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
currentUserData: BehaviorSubject<User>=new BehaviorSubject<User>({email:""}); //ACA DEBERIA TRABAJARSE CON UN LOCAL STORAGE
  
constructor(private http:HttpClient) { }

login(credentials: LoginRequest, email:string | null): Observable<User> {
  return this.http.get<User>("https://api-tpi-production.up.railway.app/api/login/"+email).pipe(
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
