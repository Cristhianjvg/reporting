import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginModule } from '../pages/login/login.module';



@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent
  ],
  exports: [
    SidebarComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    LoginModule
  ]
  
  
})
export class SharedModule { }
