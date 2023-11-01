import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

import { User } from 'src/app/services/auth/user';
import { PokedexComponent } from 'src/app/pages/pokedex/pokedex.component';
import { type } from 'src/app/models/type.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  
  datos:string | null
  user:any
  coleccion: Pokemon[] = []

  
  constructor(private cartasService:CartasService, private pokemonService: PokemonService) { 
    this.datos = localStorage.getItem("user")

    if(this.datos){
      this.user = JSON.parse(this.datos)
      if(this.user){
        this.getCartas()
      }
      
      /* if(this.user){
        console.log(this.user.id)
        this.cartasService.getUserCards(this.user.id).subscribe(
          (response)=>{
            console.log(response)
          },
          (error)=>{
            console.log(error)
          }
        )
      }
      console.log(this.user) */
    }
  }

  getCartas(){
    if(this.user.id){
      this.cartasService.getUserCards(this.user.id).subscribe(
        (response)=>{
         console.log(response)
         response.forEach(carta => {
          this.pokemonService.getPokemon(carta.pokemonID.toString()).subscribe(
            (response)=>{
              console.log(response)
              this.coleccion.push(response)
            },
            (error)=>{
              console.log(error)
            }
          )
         });
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  getPokemon(id:string){
    this.pokemonService.getPokemon(id).subscribe(
      (response)=>{
        console.log(response)
        return response
        
      },
      (error)=>{
        return error
      }
    )
  }


  isGrassType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'grass');
  }
  
  isFireType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'fire');
  }
  
  isWaterType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'water');
  }

  isPoisonType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'poison');
  }

  isElectricType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'electric');
  }

  isPsychicType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'psychic');
  }

  isFightingType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'fighting');
  }

  isGroundType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'ground');
  }

  isBugType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'bug');
  }

  isFlyingType(pokemon: Pokemon): boolean {
    return pokemon.types.some((type: type) => type.type.name === 'flying');
  }

}



