import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsiganturasComponent } from './asignaturas.component';
import { AsignaturasRoutingModule } from './asignaturas-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [AsiganturasComponent],
  imports: [
    CommonModule,
    AsignaturasRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AsignaturasModule { }
