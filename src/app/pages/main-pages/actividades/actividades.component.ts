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
import { Papa } from 'ngx-papaparse'; // Importa el módulo Papa para parsear CSV
import { functions } from 'src/app/helpers/functions';
import * as Notiflix from 'notiflix';
import { HttpClient } from '@angular/common/http';

// import

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
})
export class ActividadesComponent implements AfterViewInit {
  constructor(
    private docentesService: DocenteService,
    private carrerasService: CarrerasService,
    private asignaturasService: AsignaturaService,
    private form: FormBuilder,
    private materialesService: MaterialesService,
    private actividadService: ActividadService,
    private papa: Papa,
    private http: HttpClient
  ) {}
  public AsignaturaData: Array<{ text: string; value: number }> = [];

  //formulario
  public f = this.form.group({
    carrera: ['', Validators.required],
    asignatura: [this.AsignaturaData[0], Validators.required],
    docentes: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    // fechainicio: ['', Validators.required],
    fechafinal: ['', Validators.required],
    descripcion: ['', Validators.required],
    pao: ['', Validators.required, Validators.pattern('01234')],
    actividad: ['', Validators.required],
  });
  formSubmitted = false;

  invalidField(field: string) {
    return functions.invalidField(field, this.f, this.formSubmitted);
  }

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
  emailForm: string = '';
  public value: any = [];

  dataActividad: any[] = [];
  public DocentesData: Array<{ text: string; value: number; email: string }> =
    [];
  public CarrerasData: Array<{ text: string; value: number }> = [];

  public ActividadData: Array<{ text: string; value: number }> = [];

  csvEnabled = false;

  lastId: number = 0;
  getDocentes() {
    this.docentesService.getData().subscribe((resp: any) => {
      this.docentes = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            apellido: resp[a].apellido,
            celular: resp[a].celular,
            email: resp[a].email,
            nombre: resp[a].nombre,
          } as Idocentes)
      );
      this.DocentesData = this.docentes.map((docente: Idocentes) => {
        return {
          text: docente.nombre,
          value: parseInt(docente.id, 10),
          email: docente.email,
        };
      });
    });
  }

  handleCSVCheckboxChange(event: any) {
    this.csvEnabled = event.target.checked;
    if (this.csvEnabled) {
      this.f.controls['carrera'].disable();
      this.f.controls['docentes'].disable();
      this.f.controls['pao'].disable();
      this.f.controls['asignatura'].disable();
      this.f.controls['email'].disable();
      this.f.controls['actividad'].disable();
      this.f.controls['fechafinal'].disable();
    } else {
      this.f.controls['carrera'].enable();
      this.f.controls['docentes'].enable();
      this.f.controls['pao'].enable();
      this.f.controls['asignatura'].enable();
      this.f.controls['email'].enable();
      this.f.controls['actividad'].enable();
      this.f.controls['fechafinal'].enable();
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileName = inputElement.files?.[0]?.name;
    if (fileName) {
      const archivoCSVLabel = document.getElementById('archivoCSVLabel');
      if (archivoCSVLabel) {
        archivoCSVLabel.innerText = fileName;
      }
    }
  }

  getCarreras() {
    this.carrerasService.getData().subscribe((resp: any) => {
      this.carreras = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            nombre: resp[a].nombre,
          } as Carreras)
      );
      this.CarrerasData = this.carreras.map((carreras: Carreras) => {
        return { text: carreras.nombre, value: parseInt(carreras.id, 10) };
      });
      
    });
  }

  getAsignaturas(carrera: any) {

    this.carrerasService.getData().subscribe((resp: any) => {
      this.carreras1 = Object.keys(resp)
        .map(
          (a) =>
            ({
              id: resp[a].id,
              asignatura: resp[a].asignatura,
              nombre: resp[a].nombre,
            } as Carreras)
        )
        .filter((asig) => asig.id === String(carrera[0].value));

      this.AsignaturaData = this.carreras1.map((asig: Carreras) => {
        return { text: asig.asignatura, value: parseInt(asig.id, 10) };
      });
    });
  }

  getEmail(email: any) {
    const selectedEmail = email[0].email; // Ajusta esto si la propiedad no se llama "email".
    this.f.controls.email.setValue(email[0]?.email );

    // Llenar automáticamente el campo de email con el email del docente seleccionado.
    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = selectedEmail;
  }

  getActividad() {
    this.actividadService.getData().subscribe((resp: any) => {
      this.actividades = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            docentes: resp[a].docentes,
            carrera: resp[a].carrera,
            pao: resp[a].pao,
            asignatura: resp[a].asignatura,
            email: resp[a].email,
            actividad: resp[a].actividad,
            fechainicio: resp[a].fechainicio,
            fechafinal: resp[a].fechafinal,
          } as Iactividad)
      );
      this.ActividadData = this.actividades.map((actividad: Iactividad) => {
        return { text: actividad.actividad, value: parseInt(actividad.id, 10) };
      });
    });
  }

  parseCSV(file: File) {
    this.asignaturasService.getData().subscribe((resp: any) => {
      const actividadesActuales: Iactividad[] = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            docentes: resp[a].codigo,
            carrera: resp[a].carrera,
            pao: resp[a].pao,
            asignatura: resp[a].asignatura,
            email: resp[a].email,
            actividad: resp[a].actividad,
            fechainicio: resp[a].fechainicio,
            fechafinal: resp[a].fechafinal,
          } as Iactividad)
      );

      let lastInsertedId = 0;
      actividadesActuales.forEach((carrera) => {
        const carreraId = parseInt(carrera.id);
        if (carreraId > lastInsertedId) {
          lastInsertedId = carreraId;
        }
      });

      this.papa.parse(file, {
        complete: (result: any) => {
          const headers = result.data[0];
          result.data.shift();
          const actividadesFromCSV: Iactividad[] = result.data
            .map((row: any) => {
              lastInsertedId++; // Generar el nuevo ID sumándole uno al último ID insertado
              const carrera: Iactividad = {
                id: String(lastInsertedId),
                carrera: row[headers.indexOf('carrera_nombre')],
                asignatura: row[headers.indexOf('asignatura_nombre')],
                docentes: row[headers.indexOf('docente_nombre')],
                email: row[headers.indexOf('email')],
                pao: row[headers.indexOf('pao')],
                actividad: row[headers.indexOf('actividad')],
                fechafinal: row[headers.indexOf('fecha_final')],
                fechainicio: row[headers.indexOf('fecha_inicio')],

              };
              if (
                !carrera.docentes ||
                !carrera.carrera ||
                !carrera.pao ||
                !carrera.asignatura ||
                !carrera.email ||
                !carrera.actividad ||
                !carrera.fechainicio ||
                !carrera.fechafinal 
                ) {
                console.log('Registro del CSV con campos faltantes:', carrera);
                return null; // Salir del mapeo y no insertar este registro
              }

              return carrera;
            })
            .filter((carrera: Iactividad | null) => carrera !== null); // Filtrar los registros nulos

          // Ahora que tienes los datos del CSV en actividadesFromCSV, puedes insertarlos en la base de datos
          actividadesFromCSV.forEach((carrera) => {
            this.actividadService
              .postdata(carrera, localStorage.getItem('token'))
              .subscribe(
                (resp) => {
                  // console.log('Docente insertado desde CSV:', carrera);
                  this.getActividad();
                },
                (err) => {
                  console.error('Error al insertar carrera desde CSV:', err);
                }
              );
          });
        },
      });
    });
  }

  envioCorreo(){

    Notiflix.Loading.standard('Cargando...');
    let params = {
      email: this.f.controls.email.value,
      asunto: this.f.controls.actividad.value,
      mensaje: 'este es el mensaje del correo'
    }
    // console.log(params);
    this.http.post('http://localhost:3000/envio', params).subscribe((resp: any)=>{
      Notiflix.Loading.remove();
    },
    (err: any) =>{
      console.log(err);
      Notiflix.Loading.remove();
    })
  }

  crearActividad() {
    this.formSubmitted = true;

    if (this.csvEnabled) {
      const archivoCSVInput = document.getElementById(
        'archivoCSV'
      ) as HTMLInputElement;

      if (archivoCSVInput?.files?.length) {
        const file = archivoCSVInput.files[0];
        this.parseCSV(file);
      }
    } else {
      this.actividades.forEach((actividad) => {
        const actividadId = parseInt(actividad.id);
        if (actividadId > this.lastId) {
          this.lastId = actividadId;
        }
      });

      const carreraValue = this.f.controls.carrera.value;
      const carreraText = Array.isArray(carreraValue) && carreraValue.length > 0 ? carreraValue[0].text : '';

      const asignaturaValue = this.f.controls.asignatura.value;
      const asignaturaText = Array.isArray(asignaturaValue) && asignaturaValue.length > 0 ? asignaturaValue[0].text : '';

      const docenteValue = this.f.controls.docentes.value;
      const docenteText = Array.isArray(docenteValue) && docenteValue.length > 0 ? docenteValue[0].text : '';

    
      this.lastId = this.lastId + 1;
      const dataActividad: Iactividad = {
        id: String(this.lastId),
        docentes: docenteText,
        carrera: carreraText,
        pao: parseInt(this.f.controls.pao.value ?? ''),
        asignatura: asignaturaText,
        email: this.f.controls.email.value ?? '',
        actividad: this.f.controls.actividad.value ?? '',
        fechainicio: new Date(),
        fechafinal: new Date(this.f.controls.fechafinal.value ?? ''),
      };

      //guardar la actividad en la base de datos
      this.actividadService.postdata(dataActividad, localStorage.getItem('token')).subscribe(
          (resp: any) => {

            this.envioCorreo();
            this.getActividad();
            alerts.basicAlert('OK', 'la actividad fue guardada', 'success');
          },
          (err: any) => {
            alerts.basicAlert(
              'Error',
              'no se pudo guardar la actividad',
              'error'
            );
            console.log(err);
          }
        );


      
    }
  }

  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith',
  };
}
