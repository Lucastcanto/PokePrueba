import { Component } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { User } from 'src/app/services/auth/user';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/services/tienda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent {

  offerData: string | null
  userData: string | null
  offer: Offer | null
  user: any | null
  creditCardForm: FormGroup;


  constructor(private router:Router, private tiendaService:TiendaService,private fb: FormBuilder){
    this.offerData = localStorage.getItem("compra")
    this.userData = localStorage.getItem("user")

    this.creditCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.creditCardValidator, Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, this.validateExpirationDate]],
      cvv: ['', [Validators.required]],
      cardHolderName: ['', [Validators.required]]
    });

    if(this.offerData && this.userData){
      console.log(this.userData+ this.offerData)
      this.offer = JSON.parse(this.offerData)
      this.user = JSON.parse(this.userData)
    }
    else{
      this.offer = null
      this.user = null
    }
  }

  validateExpirationDate(control: { value: any; }) {
    const expirationDate = control.value;

    if (expirationDate) {
      // Usamos una expresión regular para verificar el formato "MM/YY"
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!regex.test(expirationDate)) {
        return { invalidDate: true };
      }
    }

    return null;
  }

  comprar() {
    if (this.offer && this.user) {
      let pokebolasTotal = this.user.pokebolas + this.offer.cantOfPokeballs;
  
      this.tiendaService.updatePokeballs(this.user.id.toString(), pokebolasTotal).subscribe(
        (response) => {
          localStorage.setItem('user', JSON.stringify({ nombre: this.user.nombre, apellido: this.user.apellido, email: this.user.email, creditos: this.user.creditos, pokebolas: pokebolasTotal, id: this.user.id }));
          console.log(response);
          this.router.navigate(["/tienda"]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Hubo un error.");
    }
  }
  

  get cardNumber() {
    return this.creditCardForm.controls['cardNumber'];
  }

  get expirationDate() {
    return this.creditCardForm.controls['expirationDate'];
  }

  get cvv() {
    return this.creditCardForm.controls['cvv'];
  }

  get cardHolderName() {
    return this.creditCardForm.controls['cardHolderName'];
  }

  creditCardValidator(control: { value: any; }) {
    const cardNumber = control.value;
  
    if (cardNumber) {
      const cleanCardNumber = cardNumber.replace(/\D/g, '');
  
      if (cleanCardNumber) {
        const cardDigits = cleanCardNumber.split('').map(Number);
        let sum = 0;
        let alternate = false;
  
        for (let i = cardDigits.length - 1; i >= 0; i--) {
          let digit = cardDigits[i];
  
          if (alternate) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
  
          sum += digit;
          alternate = !alternate;
        }
  
        if (sum % 10 === 0) {
          return null; // El número de tarjeta es válido según Luhn
                      // Valid VISA: 4888524251678924   Invalid VISA: 4888524251678923
        } else {
          console.log("NUMERO DE TARJETA INVALIDO.")
          return { invalidCard: true }; // El número de tarjeta es inválido según Luhn
        }
      }
    }
    return null; // Devuelve null si el campo está vacío o no contiene dígitos válidos
  }

}



