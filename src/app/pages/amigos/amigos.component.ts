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
  errorMessage:string=""
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

  followUser(email:string){
    if(email != this.user.email && email!=""){
      this.loginService.getUser(email).subscribe(
        (response)=>{
          this.amigosService.createFollow(this.user.id, response.userid.toString()).subscribe(
            (response2)=>{
              console.log(response2)
              this.followed.push(response)
            },
            (error)=>{
              console.log("no se pudo seguir al usuario")
              this.errorMessage="Ya sigues a este usuario."
            }
          )
        },
        (error)=>{
          console.log("no se encontro al usuario")
          this.errorMessage="Usuario no registrado"
        }
      )
    }else{
      console.log("no te podes seguir o tenes que meter un email")
      this.errorMessage="Usuario invalido."
    }
    
  }

  unfollowUser(idToUnfollow: string){
    console.log(idToUnfollow)
    let elementPos = this.followed.map(function(x) {return x.id; }).indexOf(idToUnfollow);
    let objectFound = this.followed[elementPos]
    console.log(elementPos)
    /* if(this.user){
      this.amigosService.deleteFollow(this.user.id, idToUnfollow).subscribe(
        (response)=>{
          this.updatefollowed()
          console.log(response)
        },
        (error)=>{
          console.log(error)
        }
      )
    } */
  }

  updatefollowed(){
    if(this.user){
      this.followed = [];
      this.amigosService.getFollowed(this.user.id).subscribe(
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
    
  }

}
