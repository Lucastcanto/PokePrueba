import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  
  datos:string | null
  user:any
  
  constructor(private loginService:LoginService) { 
    this.datos = localStorage.getItem("user")

    if(this.datos){
      this.user = JSON.parse(this.datos)
    }
    console.log(this.user)    
  }



 
}
