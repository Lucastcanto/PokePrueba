import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/auth/user';
import { FormBuilder, Validators} from '@angular/forms';

import { SignupService } from 'src/app/services/auth/signup.service';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent {
  user: User | undefined;

    signupError:string="";
    signupForm=this.formBuilder.group({
      email:['',[Validators.email]],
      password: [''],
      name: [''],
      lastName:['']
    })
  
    constructor(private formBuilder:FormBuilder, private router:Router, private signupService: SignupService) {
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

    let email = this.signupForm.controls.email.value
    let nombre = this.signupForm.controls.name.value
    let apellido = this.signupForm.controls.lastName.value
    let contrasenia = this.signupForm.controls.password.value
    console.log(this.user?.nombre)

    if(this.user){
      if(email == ""){
        email = this.user?.email
        console.log(email)
      }
      if(nombre == ""){
        nombre = this.user?.nombre
        console.log(nombre)
      }
      if(apellido == ""){
        apellido = this.user?.apellido
      }
      if(contrasenia == ""){
        contrasenia = this.user?.contrasenia
      }
    }
    

    console.log("email:"+email+" nombre:"+nombre+" apellido:"+apellido+" contrasenia:"+contrasenia)
    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('user', JSON.stringify(this.user));

    //this.router.navigate(['/perfil']);
  }
}

