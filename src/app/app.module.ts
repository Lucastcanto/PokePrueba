import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { UserInfoComponent } from './shared/user-info/user-info.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ModificarPerfilComponent } from './pages/modificar-perfil/modificar-perfil.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';
import { AbrirCartasComponent } from './pages/abrir-cartas/abrir-cartas.component';
import { AmigosComponent } from './pages/amigos/amigos.component';
import { ColeccionSeguidorComponent } from './pages/coleccion-seguidor/coleccion-seguidor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    UserInfoComponent,
    PokedexComponent,
    SignupComponent,
    ModificarPerfilComponent,
    TiendaComponent,
    TransaccionComponent,
    AbrirCartasComponent,
    AmigosComponent,
    ColeccionSeguidorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }