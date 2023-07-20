import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaMaterialComponent } from './carga-material.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import { CargaMaterialRoutingModule } from './carga-material-routing.module';
import { IonicModule } from '@ionic/angular';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CargaMaterialComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    CargaMaterialRoutingModule
  ]
})
export class CargaMaterialModule { }
