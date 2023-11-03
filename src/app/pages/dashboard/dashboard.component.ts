import { Component, OnInit } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonSpeciesService } from 'src/app/services/pokemon-species.service';
import { type } from 'src/app/models/type.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  datos: string | null;
  user: any;
  coleccion: Pokemon[] = [];

  constructor(
    private cartasService: CartasService,
    private pokemonService: PokemonService,
    private pokemonSpeciesService: PokemonSpeciesService
  ) {
    this.datos = localStorage.getItem('user');

    if (this.datos) {
      this.user = JSON.parse(this.datos);
      if (this.user) {
        this.getCartas();
      }
    }
  }

  ngOnInit(): void {
    // Agrega aquí cualquier inicialización adicional que puedas necesitar.
  }

  getCartas() {
    if (this.user.id) {
      this.cartasService.getUserCards(this.user.id).subscribe(
        (response) => {
          console.log(response);
          response.forEach((carta) => {
            this.pokemonService.getPokemon(carta.pokemonID.toString()).subscribe(
              (response) => {
                console.log(response);
                this.pokemonSpeciesService.getspecies(response.species.url).subscribe((speciesResponse) => {
                  const desc = speciesResponse.flavor_text_entries.find((flavour_text) => flavour_text.language.name === 'es');
                  if (desc) {
                    response.descripcion = desc.flavor_text;
                  }
                });
                this.coleccion.push(response);
              },
              (error) => {
                console.log(error["message"]);
              }
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
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

  getPrimaryType(pokemon: Pokemon){
    return pokemon.types[0].type.name;
  }

}



