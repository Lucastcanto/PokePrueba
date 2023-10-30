import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: any;
  img: string = '../assets/images/EntrenadorPokemon1.jpg'

  constructor() {
    this.user = localStorage.getItem('user');
    if (this.user) {                                 //AGREGAR LOGICA IMAGEN PERFIL
      try {
        this.user = JSON.parse(this.user);
      } catch (error) {
        console.error('Error al analizar los datos del usuario desde el localStorage:', error);
      }
    }
  }

  ngOnInit() {}
}

