import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:string="";
  loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private router:Router,private loginService: LoginService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }


  login() {
    const email=this.loginForm.controls.email.value
    console.log(email)
    if (email!=null) {
      this.loginService.getUser(email.toString() ).subscribe(
        (response) => {
          console.log(response)
          if (response.contrasenia == this.loginForm.controls.password.value)
          {
            this.router.navigate(["/inicio"]);
            localStorage.setItem("user",JSON.stringify({nombre:response.nombre,apellido:response.apellido,email:response.email,creditos:response.creditos,pokebolas:response.pokebolas,id:response.id}))
          }
          else
          {
            console.log("contrasenia incorrecta");
            this.loginError="Contraseña incorrecta";
          }
        },
        (error) => {
          console.log(error["error"]["message"])
        }
      );
    } else {
      // Mensaje de error en los datos.
    }
  }
}
