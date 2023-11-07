import { Component } from '@angular/core';

@Component({
  selector: 'app-coleccion-seguidor',
  templateUrl: './coleccion-seguidor.component.html',
  styleUrls: ['./coleccion-seguidor.component.css']
})
export class ColeccionSeguidorComponent {
  user: any

  constructor(){
    let data = localStorage.getItem('seguido')
    if(data){
      this.user = JSON.parse(data)
    }
    console.log(this.user)
  }

}
