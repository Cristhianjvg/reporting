import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    MainPagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
