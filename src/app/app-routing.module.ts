import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCorreosComponent } from './components/lista-correos/lista-correos.component';
import { CorreoComponent } from './components/correo/correo.component'


const routes: Routes = [
  {path: '', redirectTo: 'correos', pathMatch: 'full' },
  {path: 'correos', component: ListaCorreosComponent},
  {path: 'aguacate', component: ListaCorreosComponent},
  {path: 'correo', component: CorreoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
