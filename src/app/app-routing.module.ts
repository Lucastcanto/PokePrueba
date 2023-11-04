import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ModificarPerfilComponent } from './pages/modificar-perfil/modificar-perfil.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';

const routes: Routes = [
  {path:'',redirectTo:'iniciar-sesion', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path: 'pokedex', component:PokedexComponent},
  {path: 'registrarse', component:SignupComponent},
  { path: 'modificar-perfil', component: ModificarPerfilComponent},
  {path: 'tienda',component:TiendaComponent },
  {path: 'transaccion' , component: TransaccionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }