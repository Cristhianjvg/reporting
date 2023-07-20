import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {Storage, ref, uploadBytes} from '@angular/fire/storage';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-carga-material',
  templateUrl: './carga-material.component.html',
  styleUrls: ['./carga-material.component.css']
})
export class CargaMaterialComponent {

  public f = this.form.group({
    email: ['', Validators.required, Validators.email],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required]
    
  })


  public CarrerasData: Array<{ text: string; value: number }> = [
    { text: "Computacion", value: 1 },
    { text: "Derecho", value: 2 },
    { text: "Medicina", value: 3 },
    { text: "arquitectura", value: 4 },
  ];

  public AsignaturasData: Array<{ text: string; value: number }> = [
    { text: "etica", value: 1 },
    { text: "programacion", value: 2 },
    { text: "base de datos", value: 3 },
    { text: "diseño", value: 4 },
  ];

  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: "startsWith",
  };

  constructor(private form: FormBuilder, private storage: Storage){
  }

  subirArchivos(event: any){


    const file = event.target.files[0];
    const archRef = ref(this.storage, `pdfs/${file.name}`);

    uploadBytes(archRef, file).then(x => {
      console.log(x);
    }).catch(error => console.log(error));
  }

}
