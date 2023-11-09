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
                this.coleccion.sort((a,b)=> a.id - b.id)
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



  isGrassType(pokemon:Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="grass")
  }
  
  isFireType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="fire")
  }
  
  isWaterType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="water")
  }

  isPoisonType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="poison")
  }

  isElectricType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="electric")
  }

  isPsychicType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="psychic")
  }

  isFightingType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="fighting")
  }

  isGroundType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="ground")
  }

  isBugType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="bug")
  }

  isFlyingType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="flying")
  }

  isPhantomType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="phantom")
  }

  isDragonType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="dragon")
  }

  isNormalType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="normal")
  }

  isRockType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="rock")
  }

  isFairyType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="fairy")
  }
  isGhostType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="ghost")
  }
  isIceType(pokemon: Pokemon): boolean {
    return (this.getPrimaryType(pokemon)=="ice")
  }

  getPrimaryType(pokemon: Pokemon){
    return pokemon.types[0].type.name;
  }

}

