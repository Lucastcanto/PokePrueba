import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

import { User } from 'src/app/services/auth/user';
import { PokedexComponent } from 'src/app/pages/pokedex/pokedex.component';

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



}
