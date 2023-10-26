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
  // Realiza la solicitud HTTP para obtener los datos del JSON
  return this.http.get<User>("././assets/data.json").pipe(
    tap((userData) => {
      // Compara los campos relevantes del JSON con los campos de credentials
      if (userData.email=== credentials.email && userData.password === credentials.password) {
        // Los datos coinciden, puedes realizar las acciones necesarias
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      } else {
        // Los datos no coinciden, puedes manejar el error o mostrar un mensaje al usuario
        console.error("Credenciales incorrectas");
      }
    }),
    catchError(this.handleError)
  );
}


private handleError(error:HttpErrorResponse){
if (error.status==0)
{
  console.log("Se ha producido un error: ",error.error);
}
else
{
  console.log("Backend retorno el codigo de estado ",error.status,error.error)
}
return throwError(()=>new Error("Algo fallo, intente de nuevo."))
}
get userData():Observable<User>{
  return this.currentUserData.asObservable();
}

}
