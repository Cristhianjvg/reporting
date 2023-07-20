import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {Storage, ref, uploadBytes} from '@angular/fire/storage';

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
