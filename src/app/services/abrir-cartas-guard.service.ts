import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AbrirCartasGuardService {

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
      let data = localStorage.getItem("user")
      if(!data){
        console.log("no podes pasar")
        alert('inicia sesion o registrate para ver la página');
        this.router.navigate(["/iniciar-sesion"])
        return false

        
      }else{
        let user = JSON.parse(data)
        if(user.pokebolas<=0){
          console.log("no podes pasar")
          alert('dirigete a la tienda para comprar pokebolas')
          this.router.navigate(["/inicio"])
          return false
        }else{
          console.log("podes pasar")
          return true
        }
        
      }
  }
}
