import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/main-pages/home/home.component';
import { MainPagesComponent } from './pages/main-pages/main-pages.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
