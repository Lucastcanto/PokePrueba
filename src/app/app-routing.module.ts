import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ModificarPerfilComponent } from './pages/modificar-perfil/modificar-perfil.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';
import { AbrirCartasComponent } from './pages/abrir-cartas/abrir-cartas.component';
import { AmigosComponent } from './pages/amigos/amigos.component';
import { ColeccionSeguidorComponent } from './pages/coleccion-seguidor/coleccion-seguidor.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TransaccionGuardService } from './services/transaccion-guard.service';
import { AbrirCartasGuardService } from './services/abrir-cartas-guard.service';

const routes: Routes = [
  {path:'',redirectTo:'iniciar-sesion', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent, canActivate: [AuthGuardService]},
  {path:'iniciar-sesion',component:LoginComponent},
  {path: 'pokedex', component:PokedexComponent, canActivate: [AuthGuardService]},
  {path: 'registrarse', component:SignupComponent},
  { path: 'modificar-perfil', component: ModificarPerfilComponent, canActivate: [AuthGuardService]},
  {path: 'tienda',component:TiendaComponent , canActivate: [AuthGuardService]},
  {path: 'transaccion' , component: TransaccionComponent, canActivate: [AuthGuardService, TransaccionGuardService]},
  {path: 'abrir-cartas', component:AbrirCartasComponent, canActivate: [AuthGuardService, AbrirCartasGuardService]},
  {path: 'amigos', component: AmigosComponent, canActivate: [AuthGuardService]},
  {path: 'seguido', component: ColeccionSeguidorComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }