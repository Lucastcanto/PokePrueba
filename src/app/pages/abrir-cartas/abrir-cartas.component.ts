import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CartasService } from 'src/app/services/cartas.service';
import { TiendaService } from 'src/app/services/tienda.service';


@Component({
  selector: 'app-abrir-cartas',
  templateUrl: './abrir-cartas.component.html',
  styleUrls: ['./abrir-cartas.component.css']
})
export class AbrirCartasComponent {

  user: any

  constructor(private router:Router,private pokemonService:PokemonService, private cartasService:CartasService, private tiendaService:TiendaService){
    this.getRandomPokemon()
    let data = localStorage.getItem('user')
    if(data){
      this.user = JSON.parse(data)
    }
    console.log(this.user)
    
  }

  getRandomPokemon(){
    let randomNumber = Math.floor(Math.random() * 150) + 1

    this.pokemonService.getPokemon(randomNumber.toString()).subscribe(
      (response)=>{
        if(this.user){
          let user = this.user.id
          let pokemon = response.id.toString()

          console.log(typeof(user)+ "userid: "+user+"\n"+typeof(pokemon)+"pokemonid: "+pokemon)
          this.cartasService.createCard(user.toString(), pokemon).subscribe(
            (response)=>{
              console.log("nueva carta: "+response.pokemonID)
              let pokebolasTotal = this.user.pokebolas - 1
              this.tiendaService.updatePokeballs(user, pokebolasTotal).subscribe(
                (response)=>{
                  localStorage.setItem('user', JSON.stringify({ nombre: this.user.nombre, apellido: this.user.apellido, email: this.user.email, creditos: this.user.creditos, pokebolas: pokebolasTotal, id: this.user.id }));
                  let data = localStorage.getItem('user')
                  if(data){
                    this.user = JSON.parse(data)
                  }
                },
                (error)=>{
                  console.log(error)//tirar mensaje
                }
              )
            },
            (error)=>{
              console.log(error)//tirar mensaje
            }
          )
        }
      },
      (error)=>{
        return(error)
      }
    )
  }


}
