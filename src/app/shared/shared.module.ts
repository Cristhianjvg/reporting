import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



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
    IonicModule
  ]
  
  
})
export class SharedModule { }
