import { Component, AfterViewInit } from '@angular/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';
import { CarrerasService } from 'src/app/service/carreras.service';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { Carreras } from 'src/app/interface/carreras';
import { Iasignatura } from 'src/app/interface/iasignatura';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements AfterViewInit { 

  constructor(private docentesService: DocenteService,private carrerasService: CarrerasService,
    private asignaturasService: AsignaturaService, private form: FormBuilder){

  }

  public f = this.form.group({
    carrera: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')]],
    asignatura: ['', Validators.required],
    docente: ['', [ Validators.required]],
    email: [''],
    fechaI: ['', [Validators.required, Validators.email]],
    fechaF: ['', [Validators.required, Validators.email]],
    actividad: ['']
  })

  ngAfterViewInit() {
  this.getDocentes();
  this.getCarreras();
  }

  
  docentes: Idocentes[] = [];
  carreras: Carreras[] = [];
  asignaturas: Iasignatura[] = [];
  public DocentesData: Array<{ text: string; value: number; email: string }> = [];
  public CarrerasData: Array<{ text: string; value: number }> = [];
  public AsignaturaData: Array<{ text: string; value: number }> = [];
  
  getDocentes(){
    this.docentesService.getData().subscribe((resp: any)=> {
      this.docentes = Object.keys(resp).map(a => ({
        
        id: resp[a].id,
        apellido: resp[a].apellido,
        celular: resp[a].celular,
        email: resp[a].email,
        nombre: resp[a].nombre
      }) as Idocentes)
      this.DocentesData = this.docentes.map((docente: Idocentes) => {
        return { text: docente.nombre, value: parseInt(docente.id, 10), email: docente.email  };
        
      });
      console.log(this.DocentesData);
    });
  }

  getCarreras(){
    this.carrerasService.getData().subscribe((resp: any)=> {
      this.carreras = Object.keys(resp).map(a => ({
        id: resp[a].id,
        nombre: resp[a].nombre,
      }) as Carreras)
      this.CarrerasData = this.carreras.map((carreras: Carreras) => {
     
        return { text: carreras.nombre, value: parseInt(carreras.id, 10)  };
      });
      console.log("carreras",this.carreras);
    });
  }

  getAsignaturas(carrera:any){

    this.asignaturasService.getData().subscribe((resp: any)=> {
      this.asignaturas = Object.keys(resp).map(a => ({
        id: resp[a].id,
        nombre: resp[a].nombre,
        carrera: resp[a].carrera,
        
      }) as Iasignatura).filter(asig => asig.carrera === String(carrera[0].value));

      this.AsignaturaData = this.asignaturas.map((asig: Iasignatura) => {
        return { text: asig.nombre, value: parseInt(asig.id, 10)  };
      });
    });
  }
  
  getEmail(email: any){

    // this.EmailData = this.docentes.filter(doc => doc.id === String(email[0].id)).map((doc: Idocentes) => {
    //   return { email: doc.email }
    // })

    const selectedEmail = email[0].email; // Ajusta esto si la propiedad no se llama "email".

    // Llenar automáticamente el campo de email con el email del docente seleccionado.
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = selectedEmail;

    // const emailInput = document.getElementById('email') as HTMLInputElement;

  }

  

  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: "startsWith",
  };
  

  
}
