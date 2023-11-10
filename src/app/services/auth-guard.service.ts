import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{

      if(localStorage.getItem("user")){
        console.log("podes pasar")
        return true
      }else{
        console.log("no podes pasar")
        alert('inicia sesion o registrate para ver la página');
        this.router.navigate(["/iniciar-sesion"])
        return false
      }
  }
}
