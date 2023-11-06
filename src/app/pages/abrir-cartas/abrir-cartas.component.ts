import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CartasService } from 'src/app/services/cartas.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-abrir-cartas',
  templateUrl: './abrir-cartas.component.html',
  styleUrls: ['./abrir-cartas.component.css']
})
export class AbrirCartasComponent {

  user: any

  constructor(private router:Router,private pokemonService:PokemonService, private cartasService:CartasService){
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
              
            },
            (error)=>{
              console.log(error)
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
