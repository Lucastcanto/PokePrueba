import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from "@angular/router";
import { Pokemon } from '../../models/pokemon.model';
import { PokemonSpeciesService } from '../../services/pokemon-species.service';

import { species } from '../../models/species.model';
import { flavor_text_entry } from '../../models/flavour-text.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  pokedex: Pokemon[]=[];

  constructor(private pokemonService: PokemonService,private pokemonSpeciesService: PokemonSpeciesService){
    for (let index = 1; index < 152; index++) {
      this.pokemonService.getPokemon(index.toString()).subscribe((response) =>{
        //console.log(this.pokedex.length)
        this.pokedex.push(response)
        //this.route.navigate(['pokemon'])
        })
    }
  }


  getPokemon(id: number){
    console.log(this.pokedex.find(pokemon => this.isPokemon(id, pokemon)))
  }

  isPokemon(id: number, pokemon: Pokemon){
    if(pokemon.id == id){
      console.log("es")
      return true
    }else{
      console.log("no es")
      return false
    }

  }

  logPokedex(){
    this.pokedex.forEach(pokemon => {
      console.log(pokemon)
    });
  }

  showPokemon(pokemon: Pokemon, pokemonName: HTMLElement, pokemonImg : HTMLImageElement, pokemonDesc : HTMLElement, typeList: HTMLElement){
      console.log(pokemon)
      pokemonName.innerText = pokemon.name
      pokemonImg.src  = pokemon.sprites.front_default

      this.pokemonSpeciesService.getspecies(pokemon.species.url).subscribe((response) => {
        let desc = response.flavor_text_entries.find(flavour_text => flavour_text.language.name === "es")
        if(desc){
          pokemonDesc.innerText = desc.flavor_text;
        }
      })

      while(typeList.firstChild){
        typeList.firstChild.remove()
      }

      pokemon.types.forEach(type => {
        let listItem: HTMLElement = document.createElement("li")

        listItem.innerText = type.type.name;

        if(typeList){
          typeList.appendChild(listItem)
        }
        
      });
  }

}
