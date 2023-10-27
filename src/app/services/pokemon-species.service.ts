import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { species } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonSpeciesService {

  constructor(private http: HttpClient) {}

  getspecies(url: string){
     let response = this.http.get<species>(url)
     return response
  }
}
