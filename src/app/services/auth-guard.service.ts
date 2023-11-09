import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  data: any

  constructor(private router:Router) {
    this.data = localStorage.getItem("user")
   }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
      if(this.data){
        console.log("podes pasar")
        return true
      }else{
        console.log("no podes pasar"+this.data)
        alert('You are not allowed to view this page. You are redirected to login Page');
        this.router.navigate(["/iniciar-sesion"])
        return false
      }
  }
}
