import { Component } from '@angular/core';
import { amistad } from 'src/app/models/amistad.model';
import { AmigosService } from 'src/app/services/amigos.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent {
  user: any
  followers: any[] = []
  followed: any[] = []

  constructor(private amigosService:AmigosService, private loginService:LoginService, private router:Router){
    let data = localStorage.getItem('user')
    if(data){
      this.user = JSON.parse(data)
    }
    console.log(this.user)
    amigosService.getFollowers(this.user.id).subscribe(
      (response)=>{
        response.forEach(amistad => {
          this.loginService.getUserById(amistad.seguidorID.toString()).subscribe(
            (response)=>{
              console.log(response)
              this.followers.push(response)
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
    amigosService.getFollowed(this.user.id).subscribe(
      (response)=>{
        response.forEach(amistad => {
          this.loginService.getUserById(amistad.seguidoID.toString()).subscribe(
            (response)=>{
              this.followed.push(response)
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

  showCollection(nombre: string, id:number){
    console.log(nombre)
    localStorage.setItem("seguido", JSON.stringify({nombre: nombre, id:id}))
    this.router.navigate(['/seguido'])
  }

}
