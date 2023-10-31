import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/auth/user';
import { FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent {
  user: User | undefined;

    signupError:string="";
    signupForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      name: ['', Validators.required],
      lastName:['', Validators.required]
    })
  
    constructor(private formBuilder:FormBuilder, private router:Router) {}

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

  actualizarPerfil() {
    //  agregar lógica para actualizar el perfil
    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('user', JSON.stringify(this.user));

    this.router.navigate(['/perfil']);
  }
}

