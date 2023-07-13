import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main-pages/home/home.component';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m =>m.LoginModule)},
  {path: '', 
  component: MainPagesComponent, canActivate: [ AuthGuard],
  children: [
  {path: '', loadChildren: () => import('./main-pages/home/home.module').then(m =>m.HomeModule)},
  {path: 'docentes', loadChildren: () => import('./main-pages/docentes/docentes.module').then(m =>m.
    DocentesModule)},
  {path: 'actividades', loadChildren: () => import('./main-pages/actividades/actividades.module').then(m =>m.ActividadesModule)},
  {path: 'calendario', loadChildren: () => import('./main-pages/calendario/calendario.module').then(m =>m.CalendarioModule)}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { 

  
  
}