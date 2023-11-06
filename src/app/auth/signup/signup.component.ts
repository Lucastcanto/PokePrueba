import { Component } from '@angular/core';
import { SignupService } from 'src/app/services/auth/signup.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupError:string="";
  signupForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    name: ['', Validators.required],
    lastName:['', Validators.required]
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private signupService: SignupService){}

  get email(){
    return this.signupForm.controls.email;
  }

  get password()
  {
    return this.signupForm.controls.password;
  }
  get name(){
    return this.signupForm.controls.name;
  }

  get lastName()
  {
    return this.signupForm.controls.lastName;
  }

  signup(){
    const email=this.signupForm.controls.email.value
    const password = this.signupForm.controls.password.value
    const name = this.signupForm.controls.name.value
    const lastName = this.signupForm.controls.lastName.value

    if(email!=null && password!= null && name!= null && lastName!=null){
      let response = this.signupService.addUser(email, password, name, lastName).subscribe(
        (response)=>{
          console.log(response)
          this.router.navigate(['/inicio'])
        },
        (error)=>{
          this.signupError = "Este email ya se encuentra registrado"
          console.log(error)
        }
      )
      
    }
    
  }





}
