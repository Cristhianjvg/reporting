import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesComponent } from './docentes.component';
import { DocentesRoutingModule } from './docentes-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [DocentesComponent],
  imports: [
    CommonModule,
    DocentesRoutingModule,
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
export class DocentesModule { }
