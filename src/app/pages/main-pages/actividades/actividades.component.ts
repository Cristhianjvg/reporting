import { Component, AfterViewInit } from '@angular/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';
import { CarrerasService } from 'src/app/service/carreras.service';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { Carreras } from 'src/app/interface/carreras';
import { Iasignatura } from 'src/app/interface/iasignatura';
import { FormBuilder, Validators } from '@angular/forms';
import { MaterialesService } from 'src/app/service/materiales.service';
import { Imateriales } from 'src/app/interface/imateriales';
import { Iactividad } from 'src/app/interface/iactividad';
import { ActividadService } from 'src/app/service/actividad.service';
import { DataService } from '@progress/kendo-angular-dropdowns/common/data.service';
import { alerts } from 'src/app/helpers/alerts';
// import 

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements AfterViewInit { 

  constructor(private docentesService: DocenteService,private carrerasService: CarrerasService,
    private asignaturasService: AsignaturaService, private form: FormBuilder,
    private materialesService: MaterialesService, private actividadService: ActividadService){
    
  }

  //formulario
  public f = this.form.group({
    carrera: ['', Validators.required],
    asignatura: ['', Validators.required],
    docentes: ['', [ Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    fechainicio: ['', Validators.required],
    fechafinal: ['', Validators.required],
    descripcion: ['', Validators.required],
    pao: ['', Validators.required],
    actividad: ['', Validators.required]
    
  })

  ngAfterViewInit() {
  this.getDocentes();
  this.getCarreras();
  this.getActividad();
  }

  
  docentes: Idocentes[] = [];
  carreras: Carreras[] = [];
  carreras1: Carreras[] = [];
  asignaturas: Iasignatura[] = [];
  materiales: Imateriales[] = [];
  actividades: Iactividad[] = [];
  public value: any = [];

  dataActividad: any[] = []
  public DocentesData: Array<{ text: string; value: number; email: string }> = [];
  public CarrerasData: Array<{ text: string; value: number }> = [];
  public AsignaturaData: Array<{ text: string; value: number }> = [];
  public ActividadData: Array<{ text: string; value: number }> = [];
  
  

  lastId: number = 0;
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

    this.carrerasService.getData().subscribe((resp: any)=> {
      this.carreras1 = Object.keys(resp).map(a => ({
        id: resp[a].id,
        asignatura: resp[a].asignatura,
        nombre: resp[a].nombre
      }) as Carreras).filter(asig => asig.id === String(carrera[0].value));
      console.log(carrera[0].value);
      console.log(this.carreras1)

      this.AsignaturaData = this.carreras1.map((asig: Carreras) => {
        return { text: asig.nombre, value: parseInt(asig.id, 10)  };
      });
    });

    // const carreraValue = carrera && carrera[0]?.text ? carrera[0].text : '';
    // this.f.get('carrera').setValue(carreraValue);
  }
  
  getEmail(email: any){
    const selectedEmail = email[0].email; // Ajusta esto si la propiedad no se llama "email".

    // Llenar automáticamente el campo de email con el email del docente seleccionado.
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = selectedEmail;

    
  }

  getActividad(){
    this.actividadService.getData().subscribe((resp: any)=> {
      this.actividades = Object.keys(resp).map(a => ({
        
        id: resp[a].id,
        docentes: resp[a].docentes,
        carrera: resp[a].carrera,
        pao: resp[a].pao,
        asignatura: resp[a].asignatura,
        email: resp[a].email,
        actividad: resp[a].actividad,
        fechainicio: resp[a].fechainicio,
        fechafinal: resp[a].fechafinal

      }) as Iactividad)
      this.ActividadData = this.actividades.map((actividad: Iactividad) => {
        return { text: actividad.actividad, value: parseInt(actividad.id, 10) };
        
      });
      console.log(this.ActividadData);
    });
  }

  crearActividad(){
    this.actividades.forEach((actividad) => {
      const actividadId = parseInt(actividad.id);
      if (actividadId > this.lastId) {
        this.lastId = actividadId;
      }
    });
    // console.log("formulario",this.f.controls.);

    this.lastId = this.lastId + 1;
    const dataActividad: Iactividad = {
      id: String(this.lastId),
      docentes: this.f.controls.docentes.value ?? '',
      carrera: this.f.controls.carrera.value ?? '',
      pao: parseInt(this.f.controls.pao.value ?? ''),
      asignatura: this.f.controls.asignatura.value ?? '',
      email: this.f.controls.email.value ?? '',
      actividad: this.f.controls.actividad.value ?? '',
      fechainicio: new Date(this.f.controls.fechainicio.value ?? ''),
      fechafinal: new Date(this.f.controls.fechafinal.value ?? ''),
      // asignatura: this.f.controls.asignatura.value ?? '',
    };

    this.actividadService
      .postdata(dataActividad, localStorage.getItem('token'))
      .subscribe(
        (resp: any) => {
          alerts.basicAlert('OK', 'el docente fue guardado', 'success');
          this.getDocentes();
        },
        (err: any) => {
          alerts.basicAlert(
            'Error',
            'no se pudo guardar el docente',
            'error'
          );
          console.log(err);
        }
  );

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