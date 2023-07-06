import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main-pages/home/home.component';
import { MainPagesComponent } from './main-pages/main-pages.component';

const routes: Routes = [
  {path: '', 
  component: MainPagesComponent,
  children: [
  {path: '', loadChildren: () => import('./main-pages/home/home.module').then(m =>m.HomeModule)},
  {path: 'docentes', loadChildren: () => import('./main-pages/docentes/docentes.module').then(m =>m.
    DocentesModule)},
    {path: 'actividades', loadChildren: () => import('./main-pages/actividades/actividades.module').then(m =>m.
      ActividadesModule)}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { 

  
  
}
