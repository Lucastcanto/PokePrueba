import { Component } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  Offers: Offer[] = []

  constructor(private router:Router){
    let offer1: Offer = {
      name: "normal",
      cantOfPokeballs: 1,
      price: 15,
      img: "../assets/images/NormalPokeBall.png"
    }

    let offer2: Offer = {
      name: "ultra",
      cantOfPokeballs: 3,
      price: 40,
      img: "../assets/images/UltraPokeBall.png"
    }

    let offer3: Offer = {
      name: "master",
      cantOfPokeballs: 5,
      price: 65,
      img: "../assets/images/MasterPokeBall.png"
    }

    this.Offers.push(offer1, offer2, offer3)
  }

  buyOffer(offer: Offer){
    console.log("pokebolas: "+offer.cantOfPokeballs+"\nprecio: "+offer.price)
    localStorage.setItem("compra",JSON.stringify({name: offer.name, cantOfPokeballs:offer.cantOfPokeballs, price:offer.price, img: offer.img}))
    this.router.navigate(["/transaccion"])
  }

}
