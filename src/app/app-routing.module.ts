import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path: 'bienvenidos', component: BienvenidaComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: '', redirectTo: '/bienvenidos', pathMatch: 'full' },
  {path: '**', redirectTo: '/bienvenidos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
