import { Component, OnInit } from '@angular/core';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { alerts } from 'src/app/helpers/alerts';
import { functions } from 'src/app/helpers/functions';


@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit{

  docentes: Idocentes[] = [];
  position: string = '0';
  lastId: number = 0;


  public f = this.form.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')]],
    apellido: ['', Validators.required],
    celular: [''],
    email: ['', [Validators.required, Validators.email]],
    
  })
  formSubmitted = false;
  errorForm = "";

  constructor(private docenteService: DocenteService, private form: FormBuilder){}
  
  ngOnInit(): void{
    this.getDocentes();
  }

  

  getDocentes(){
    this.docenteService.getData().subscribe((resp: any)=> {
      this.docentes = Object.keys(resp).map(a => ({
        
        id: resp[a].id,
        apellido: resp[a].apellido,
        celular: resp[a].celular,
        email: resp[a].email,
        nombre: resp[a].nombre
      }) as Idocentes)
    });
    console.log(this.docentes);
    
  }

  crearDocente(){
    this.formSubmitted = true;
    
    if(this.f.invalid){
      return;
    }

    console.log(this.lastId);
    this.docentes.forEach(docente => {
      const docenteId = parseInt(docente.id);
      if (docenteId > this.lastId) {
        this.lastId = docenteId;
      }
    });

    this.lastId = this.lastId + 1;
    console.log(this.lastId);
    const dataDocente: Idocentes = {
      id: String(this.lastId),
      nombre: this.f.controls.nombre.value ?? '',
      apellido: this.f.controls.apellido.value ?? '',
      celular: this.f.controls.celular.value,
      email: this.f.controls.email.value ?? ''
    }

    

    this.docenteService.postdata(dataDocente, localStorage.getItem('token')).subscribe(

      resp=>{
        alerts.basicAlert("OK", 'el docente fue guardado', "success");
        this.getDocentes();
      },
      err =>{
        alerts.basicAlert("Error", 'no se pudo guardar el docente', "error");
        console.log(err);
      }
    )

  }

  invalidField(field:string){

    return functions.invalidField(field, this.f,  this.formSubmitted)
  }

}
