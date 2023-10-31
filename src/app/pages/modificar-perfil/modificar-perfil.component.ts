import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/auth/user';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent {
  user: User | undefined;

  constructor(private router: Router, private formBuilder:FormsModule) {
    
  }

  ngOnInit(): void {
    // Recuperar datos de usuario del localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  actualizarPerfil() {
    //  agregar lógica para actualizar el perfil
    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('user', JSON.stringify(this.user));

    this.router.navigate(['/perfil']);
  }
}

