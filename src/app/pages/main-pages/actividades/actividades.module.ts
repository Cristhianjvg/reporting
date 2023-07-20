import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadesRoutingModule } from './actividades-routing.module';
import { ActividadesComponent } from './actividades.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActividadesComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    ActividadesRoutingModule
  ]
})
export class ActividadesModule { }
