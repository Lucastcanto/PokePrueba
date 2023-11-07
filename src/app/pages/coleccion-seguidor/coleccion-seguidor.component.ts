import { Component } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonSpeciesService } from 'src/app/services/pokemon-species.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { carta } from 'src/app/models/carta.model';

@Component({
  selector: 'app-coleccion-seguidor',
  templateUrl: './coleccion-seguidor.component.html',
  styleUrls: ['./coleccion-seguidor.component.css']
})
export class ColeccionSeguidorComponent {
  user: any
  coleccion: Pokemon[] = []

  constructor(private cartasService: CartasService, private pokemonService: PokemonService, private speciesService: PokemonSpeciesService){
    let data = localStorage.getItem('seguido')
    if(data){
      this.user = JSON.parse(data)
      this.cartasService.getUserCards(this.user.id).subscribe(
        (response)=>{
          response.forEach(carta => {
            this.pokemonService.getPokemon(carta.pokemonID.toString()).subscribe(
              (response)=>{
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

}
