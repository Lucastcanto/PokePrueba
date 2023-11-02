import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/auth/user';
import { FormBuilder, Validators} from '@angular/forms';

import { SignupService } from 'src/app/services/auth/signup.service';
import { LoginService } from 'src/app/services/auth/login.service';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent {
  user: User | undefined;

    modifiedError:string="";
    signupForm=this.formBuilder.group({
      email:['',[Validators.email]],
      password: [''],
      name: [''],
      lastName:['']
    })
  
    constructor(private formBuilder:FormBuilder, private router:Router, private signupService: SignupService, private loginService:LoginService) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }

    ngOnInit(): void {
      // Recuperar datos de usuario del localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }

  get email(){
    return this.user?.email;
  }

  get contrasenia()
  {
    return this.user?.contrasenia;
  }
  get nombre(){
    return this.user?.nombre;
  }

  get apellido()
  {
    return this.user?.apellido;
  }

  actualizarPerfil(event: MouseEvent) {
    //falta terminar
    //  agregar lógica para actualizar el perfil
    event.preventDefault()
    
    let email: string|null|undefined = this.signupForm.controls.email.value
    let nombre: string|null|undefined = this.signupForm.controls.name.value
    let apellido: string|null|undefined = this.signupForm.controls.lastName.value
    let contrasenia: string|null|undefined = this.signupForm.controls.password.value

    if(this.user){
      this.loginService.getUser(this.user.email).subscribe(
        (response)=>{
          if(email == ""){
            email = this.user?.email
          }
          if(email == ""){
            email = this.user?.email
          }
          if(nombre == ""){
            nombre = this.user?.nombre
          }
          if(apellido == ""){
            apellido = this.user?.apellido
          }
          if(contrasenia == ""){
            contrasenia = response.contrasenia
          }
          let id = response.userid.toString()

          console.log("email:"+email+"\nnombre:"+nombre+"\napellido:"+apellido+"\ncontrasenia:"+contrasenia+"\nid:"+id)
          if(typeof(nombre) == "string" && typeof(apellido) == "string" && typeof(email) == "string" && typeof(contrasenia) == "string" && typeof(id) == "string"){
            console.log("puedo mandar los datos")
            this.signupService.updateUser(id,nombre,apellido,email,contrasenia).subscribe(
              (response)=>{
                console.log("perfil cambiado")
                this.router.navigate(["/iniciar-sesion"])
              },
              (error)=>{

                this.modifiedError="El mail ya esta siendo utilizado en otra cuenta."
              }
            )
          }
          

        }
      )
      
    }
    

    
    // Guardar los datos actualizados en el localStorage
    //localStorage.setItem('user', JSON.stringify(this.user));

    //this.router.navigate(['/perfil']);
  }
}

