import { Component } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { User } from 'src/app/services/auth/user';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent {

  offerData: string | null
  userData: string | null
  offer: Offer | null
  user: any | null

  constructor(private router:Router, private tiendaService:TiendaService){
    this.offerData = localStorage.getItem("compra")
    this.userData = localStorage.getItem("user")

    if(this.offerData && this.userData){
      console.log(this.userData+ this.offerData)
      this.offer = JSON.parse(this.offerData)
      this.user = JSON.parse(this.userData)
    }
    else{
      this.offer = null
      this.user = null
    }
  }

  comprar(){
    if(this.offer && this.user){
      let pokebolasTotal = this.user.pokebolas + this.offer.cantOfPokeballs
      console.log(pokebolasTotal)
      console.log(typeof(this.user.id))

      

      this.tiendaService.updatePokeballs(this.user.id.toString(), pokebolasTotal).subscribe(
        (response)=>{
          localStorage.setItem('user', JSON.stringify({nombre:this.user.nombre,apellido:this.user.apellido,email:this.user.email,creditos:this.user.creditos,pokebolas:pokebolasTotal,id:this.user.id}))
          console.log(response)
          this.router.navigate(["/tienda"])
        },
        (error)=>{
          console.log(error)
        }
        )
    }else{
      console.log("hubo un problema")
    }
  }

  }
