import { Component, AfterViewInit } from '@angular/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';
import { CarrerasService } from 'src/app/service/carreras.service';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { ICarreras } from 'src/app/interface/Icarreras';
import { Iasignatura } from 'src/app/interface/iasignatura';
import { FormBuilder, Validators } from '@angular/forms';
import { MaterialesService } from 'src/app/service/materiales.service';
import { Imateriales } from 'src/app/interface/imateriales';
// import 

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements AfterViewInit { 

  constructor(private docentesService: DocenteService,private carrerasService: CarrerasService,
    private asignaturasService: AsignaturaService, private form: FormBuilder,
    private materialesService: MaterialesService){

  }

  //formulario
  public f = this.form.group({
    // carrera: ['', Validators.required],
    asignatura: ['', Validators.required],
    docente: ['', [ Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    fechaI: ['', Validators.required],
    fechaF: ['', Validators.required],
    descripcion: ['']
  })

  ngAfterViewInit() {
  this.getDocentes();
  this.getCarreras();
  }

  
  docentes: Idocentes[] = [];
  carreras: ICarreras[] = [];
  asignaturas: Iasignatura[] = [];
  materiales: Imateriales[] = [];

  dataActividad: any[] = []
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
        codigo:resp[a].codigo,
        periodo:resp[a].periodo,
        nombre: resp[a].nombre,
        asignatura:resp[a].asignatura,
      }) as ICarreras)
      this.CarrerasData = this.carreras.map((carreras: ICarreras) => {
     
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

    const selectedEmail = email[0].email; // Ajusta esto si la propiedad no se llama "email".

    // Llenar automáticamente el campo de email con el email del docente seleccionado.
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = selectedEmail;

    // const emailInput = document.getElementById('email') as HTMLInputElement;

  }

  crearActividad(){

    // const dataActividad:  = {
      
    // };

  }
  //  crearDocente() {
  //   this.formSubmitted = true;

  //   if (this.csvEnabled) {
  //     // Insertar docentes desde el archivo CSV
  //     const archivoCSVInput = document.getElementById(
  //       'archivoCSV'
  //     ) as HTMLInputElement;

  //     if (archivoCSVInput?.files?.length) {
  //       const file = archivoCSVInput.files[0];
  //       this.parseCSV(file);
  //     }
  //   } else {
  //     if (this.f.invalid) {
  //       return;
  //     }

  //     console.log(this.lastId);
  //     this.docentes.forEach((docente) => {
  //       const docenteId = parseInt(docente.id);
  //       if (docenteId > this.lastId) {
  //         this.lastId = docenteId;
  //       }
  //     });

  //     this.lastId = this.lastId + 1;
  //     console.log(this.lastId);
      // const dataDocente: Idocentes = {
      //   id: String(this.lastId),
      //   nombre: this.f.controls.nombre.value ?? '',
      //   cedula: this.f.controls.cedula.value ?? '',
      //   apellido: this.f.controls.apellido.value ?? '',
      //   celular: this.f.controls.celular.value,
      //   email: this.f.controls.email.value ?? '',
      //   asignatura: this.f.controls.asignatura.value ?? '',
      // };

  //     this.docenteService
  //       .postdata(dataDocente, localStorage.getItem('token'))
  //       .subscribe(
  //         (resp) => {
  //           alerts.basicAlert('OK', 'el docente fue guardado', 'success');
  //           this.getDocentes();
  //         },
  //         (err) => {
  //           alerts.basicAlert(
  //             'Error',
  //             'no se pudo guardar el docente',
  //             'error'
  //           );
  //           console.log(err);
  //         }
  //       );
  //   }
  // }

  

  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: "startsWith",
  };
  

  
}
