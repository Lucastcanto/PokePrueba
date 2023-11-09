import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransaccionGuardService implements CanActivate{
  data: any

  constructor(private router:Router) {
    this.data = localStorage.getItem("compra")
   }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
      if(this.data){
        console.log("podes pasar")
        return true
      }else{
        console.log("no podes pasar")
        alert('You are not allowed to view this page. You are redirected to login Page');
        this.router.navigate(["/tienda"])
        return false
      }
  }


}
