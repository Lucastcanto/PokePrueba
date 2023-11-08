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
  selectedPokemon: Pokemon | null = null;
errorMessage:String="";

  constructor(private pokemonService: PokemonService,private pokemonSpeciesService: PokemonSpeciesService){
    for (let index = 1; index < 152; index++) {
      this.pokemonService.getPokemon(index.toString()).subscribe((response) =>{
        //console.log(this.pokedex.length)
        this.pokedex.push(response)
        this.pokedex.sort((a,b)=> a.id - b.id)
        //this.route.navigate(['pokemon'])
        })
    }
  }


  getPokemon(id: number){
    console.log(this.pokedex.find(pokemon => this.isPokemon(id, pokemon)))
  }

  getPokemonName(){
    let input = document.getElementById("name") as HTMLInputElement
    let name = input.value
    return(this.pokedex.find(pokemon => this.isPokemonName(name, pokemon)))
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

  isPokemonName(name:string, pokemon: Pokemon){
    if(pokemon.name == name){
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

  showPokemon(pokemon: Pokemon, pokemonName: HTMLElement, pokemonImg: HTMLImageElement, pokemonDesc: HTMLElement, typeList: HTMLElement) {
    this.selectedPokemon = pokemon;
    if (pokemonName) {
      pokemonName.innerText = pokemon.name.toUpperCase();
    }
    if (pokemonImg) {
      pokemonImg.src = pokemon.sprites.front_default;
    }
    this.pokemonSpeciesService.getspecies(pokemon.species.url).subscribe((response) => {
      let desc = response.flavor_text_entries.find(flavour_text => flavour_text.language.name === "es");
      if (pokemonDesc && desc) {
        pokemonDesc.innerText = desc.flavor_text;
      }
    });
    while (typeList && typeList.firstChild) {
      typeList.firstChild.remove();
    }
    if (typeList) {
      pokemon.types.forEach(type => {
        let listItem: HTMLElement = document.createElement("li");
        listItem.innerText = type.type.name;
        typeList.appendChild(listItem);
      });
    }
  }

  showPokemonSearched(pokemon: Pokemon | undefined, pokemonName: HTMLElement, pokemonImg: HTMLImageElement, pokemonDesc: HTMLElement, typeList: HTMLElement) {
    if(pokemon){
      this.errorMessage="";

      if (pokemonName) {
        pokemonName.innerText = pokemon.name.toUpperCase();
      }
      if (pokemonImg) {
        pokemonImg.src = pokemon.sprites.front_default;
      }
      this.pokemonSpeciesService.getspecies(pokemon.species.url).subscribe((response) => {
        let desc = response.flavor_text_entries.find(flavour_text => flavour_text.language.name === "es");
        if (pokemonDesc && desc) {
          pokemonDesc.innerText = desc.flavor_text;
        }
      });
      while (typeList && typeList.firstChild) {
        typeList.firstChild.remove();
      }
      if (typeList) {
        pokemon.types.forEach(type => {
          let listItem: HTMLElement = document.createElement("li");
          listItem.innerText = type.type.name;
          typeList.appendChild(listItem);
        });
      }

    }else{
      this.errorMessage="Pokemon no encontrado."
    }
    
  }

}



