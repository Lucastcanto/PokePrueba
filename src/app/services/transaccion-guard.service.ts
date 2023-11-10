import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransaccionGuardService implements CanActivate{

  constructor(private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
      if(localStorage.getItem("compra")){
        console.log("podes pasar")
        return true
      }else{
        console.log("no podes pasar")
        alert('aun no elegiste oferta, para comprar dirigete a la tienda');
        this.router.navigate(["/inicio"])
        return false
      }
  }


}
