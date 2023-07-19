import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent {

  public f = this.form.group({
    email: ['', Validators.required, Validators.email],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required]
    
  })

  constructor(private form: FormBuilder, private http: HttpClient){
  }

  envioCorreo(){

    Notiflix.Loading.standard('Cargando...');
    let params = {
      email: this.f.value.email,
      asunto: this.f.value.asunto,
      mensaje: this.f.value.mensaje
    }
    // console.log(params);
    this.http.post('http://localhost:3000/envio', params).subscribe(resp=>{
      console.log(resp);
      console.log(params);
      Notiflix.Loading.remove();
    },
    err =>{
      console.log(err);
      Notiflix.Loading.remove();
    })
  }

}
