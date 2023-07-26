// carreras.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { alerts } from 'src/app/helpers/alerts';
import { functions } from 'src/app/helpers/functions';
import { CarraraService } from 'src/app/service/carrera.service';
import { ICarreras } from 'src/app/interface/Icarreras';
import { Papa } from 'ngx-papaparse'; // Importa el módulo Papa para parsear CSV

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css'],
})
export class CarrerasComponent implements OnInit {
  carreras: ICarreras[] = [];
  position: string = '0';
  lastId: number = 0;
  public page!: number;
  public a = this.form.group({
    codigo: ['', [Validators.required]],
    periodo: ['', [Validators.required]],
    nombre: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')],
    ],
    asignatura: ['', Validators.required],
  });
  formSubmitted = false;
  errorForm = '';

  // Agregamos el array de asignaturas
  asignaturas: string[] = [];
  // public nuevaAsignatura: string = '';

  constructor(
    private carreraService: CarraraService,
    private form: FormBuilder,
    private carrerasService: CarraraService,
    private papa: Papa
  ) {}

  ngOnInit(): void {
    this.obtenerTodasLasCarreras();

  }

  obtenerTodasLasCarreras() {
    this.carreraService.obtenerTodasLasCarreras().subscribe((resp:any)=>{
      this.carreras = Object.keys(resp).map(
        (a)=>
        ({
            id: resp[a].id,
            codigo: resp[a].codigo,
            periodo: resp[a].periodo,
            nombre: resp[a].nombre,
            asignatura: resp[a].asignatura,
        } as ICarreras)
      );
    });
    console.log(this.carreras);
  }

  // Función para agregar una asignatura a la lista
  agregarAsignatura() {
    const asignaturaControl = this.a.controls['asignatura'];
    if (asignaturaControl && asignaturaControl.value) {
      const nuevaAsignatura = asignaturaControl.value.trim();
      if (nuevaAsignatura) {
        this.asignaturas.push(nuevaAsignatura);
        this.a.controls['asignatura'].setValue('');
      }
    }
  }

  csvEnabled = false;


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

  handleCSVCheckboxChange(event: any) {
    this.csvEnabled = event.target.checked;
    if (this.csvEnabled) {
      this.a.controls['nombre'].disable();
      this.a.controls['asignatura'].disable();
      this.a.controls['codigo'].disable();
      this.a.controls['periodo'].disable();
      
    } else {
      this.a.controls['nombre'].enable();
      this.a.controls['asignatura'].enable();
      this.a.controls['codigo'].enable();
      this.a.controls['periodo'].enable();
    }
  }

  crearCarrera() {
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
      // if (this.a.invalid) {
      //   console.log("adawd");

      //   return;
      // }


      this.carreras.forEach((carrera) => {
        const carreraId = parseInt(carrera.id);
        if (carreraId > this.lastId) {
          this.lastId = carreraId;
        }
      });

      this.lastId = this.lastId + 1;

      const dataCarrera: ICarreras = {
        id: String(this.lastId),
        codigo: this.a.controls.codigo.value ?? '',
        periodo: this.a.controls.periodo.value ?? '',
        nombre: this.a.controls.nombre.value ?? '',
        asignatura: this.asignaturas,
      };

      this.carreraService
        .agregarCarrera(dataCarrera, localStorage.getItem('token'))
        .subscribe(
          (resp) => {
            alerts.basicAlert('OK', 'La carrera fue guardada', 'success');
            this.obtenerTodasLasCarreras(); // Asumiendo que tienes una función para obtener las carreras
          },
          (err) => {
            alerts.basicAlert('Error', 'No se pudo guardar la carrera', 'error');
            console.log(err);
          }
        );
    }
  }

  parseCSV(file: File) {
    this.carreraService.obtenerTodasLasCarreras().subscribe((resp: any) => {
      const carrerasActuales: ICarreras[] = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            codigo: resp[a].codigo,
            periodo: resp[a].periodo,
            nombre: resp[a].nombre,
            asignatura: resp[a].asignatura,
          } as ICarreras)
      );

      let lastInsertedId = 0;
      carrerasActuales.forEach((carrera) => {
        const carreraId = parseInt(carrera.id);
        if (carreraId > lastInsertedId) {
          lastInsertedId = carreraId;
        }
      });

      this.papa.parse(file, {
        complete: (result) => {
          const headers = result.data[0];
          result.data.shift();
          const docentesFromCSV: ICarreras[] = result.data
            .map((row: any) => {
              lastInsertedId++; // Generar el nuevo ID sumándole uno al último ID insertado
              const carrera: ICarreras = {
                id: String(lastInsertedId),
                codigo: row[headers.indexOf('CODIGO')],
                periodo: row[headers.indexOf('PERIODO_ACADEMICO')],
                nombre: row[headers.indexOf('CARRERA')],
                asignatura: row[headers.indexOf('ASIGNATURA')],
              };

              // Validar que no haya campos vacíos o nulos
              if (
                !carrera.codigo ||
                !carrera.periodo ||
                !carrera.nombre ||
                !carrera.asignatura 
              ) {
                console.log('Registro del CSV con campos faltantes:', carrera);
                return null; // Salir del mapeo y no insertar este registro
              }

              return carrera;
            })
            .filter((carrera: ICarreras | null) => carrera !== null); // Filtrar los registros nulos

          // Ahora que tienes los datos del CSV en docentesFromCSV, puedes insertarlos en la base de datos
          docentesFromCSV.forEach((carrera) => {
            this.carreraService
              .agregarCarrera(carrera, localStorage.getItem('token'))
              .subscribe(
                (resp) => {
                  console.log('Docente insertado desde CSV:', carrera);
                  this.obtenerTodasLasCarreras();
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


  // Función para eliminar una asignatura de la lista
  eliminarAsignatura(index: number) {
    this.asignaturas.splice(index, 1);
  }

  invalidField(field: string) {
    return functions.invalidField(field, this.a, this.formSubmitted);
  }
}
