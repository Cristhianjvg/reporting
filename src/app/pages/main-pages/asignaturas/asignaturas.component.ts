// asignaturas.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { alerts } from 'src/app/helpers/alerts';
import { functions } from 'src/app/helpers/functions';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { Iasignatura } from 'src/app/interface/iasignatura';
import { Papa } from 'ngx-papaparse'; // Importa el módulo Papa para parsear CSV
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { CarrerasService } from 'src/app/service/carreras.service';
import { Carreras } from 'src/app/interface/carreras';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css'],
})
export class AsiganturasComponent implements OnInit {
  asignaturas: Iasignatura[] = [];
  position: string = '0';
  lastId: number = 0;
  public page!: number;
  public a = this.form.group({
    nombre: ['', [Validators.required]],
    carrera: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });
  formSubmitted = false;
  errorForm = '';
  carreras: Carreras[] = [];
  carreras1: Carreras[] = [];


  public CarrerasData: Array<{ text: string; value: number }> = [];
  public AsignaturaData: Array<{ text: string; value: number }> = [];


  // Agregamos el array de asignaturas
  // public nuevaAsignatura: string = '';

  constructor(
    private asignaturaService: AsignaturaService,
    private carrerasService : CarrerasService,
    private form: FormBuilder,
    private papa: Papa
  ) {}

  ngOnInit(): void {
    this.getData();
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
      console.log(carrera[0].value);
      console.log(this.carreras1);

      this.AsignaturaData = this.carreras1.map((asig: Carreras) => {
        return { text: asig.nombre, value: parseInt(asig.id, 10) };
      });
    });

    // const carreraValue = carrera && carrera[0]?.text ? carrera[0].text : '';
    // this.f.get('carrera').setValue(carreraValue);
  }

  getData() {
    this.asignaturaService.getData().subscribe((resp: any) => {
      this.asignaturas = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            nombre: resp[a].nombre,
            carrera: resp[a].carrera,
            descripcion: resp[a].descripcion,
          } as Iasignatura)
      );
    });
    console.log(this.asignaturas);
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
      this.a.controls['carrera'].disable();
      this.a.controls['descripcion'].disable();
    } else {
      this.a.controls['nombre'].enable();
      this.a.controls['carrera'].enable();
      this.a.controls['descripcion'].enable();
    }
  }

  crearAsignatura() {
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

      this.asignaturas.forEach((carrera) => {
        const asignaturaId = parseInt(carrera.id);
        if (asignaturaId > this.lastId) {
          this.lastId = asignaturaId;
        }
      });

      this.lastId = this.lastId + 1;

      const dataCarrera: Iasignatura = {
        id: String(this.lastId),
        nombre: this.a.controls.nombre.value ?? '',
        carrera: this.a.controls.carrera.value ?? '',
        descripcion: this.a.controls.descripcion.value ?? '',
      };

      this.asignaturaService
        .agregarAsignatura(dataCarrera, localStorage.getItem('token'))
        .subscribe(
          (resp) => {
            alerts.basicAlert('OK', 'La asignatura fue guardada', 'success');
            this.getData(); // Asumiendo que tienes una función para obtener las asignaturas
          },
          (err) => {
            alerts.basicAlert(
              'Error',
              'No se pudo guardar la asignatura',
              'error'
            );
            console.log(err);
          }
        );
    }
  }

  parseCSV(file: File) {
    this.asignaturaService.getData().subscribe((resp: any) => {
      const asigaturasActuales: Iasignatura[] = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            nombre: resp[a].nombre,
            carrera: resp[a].carrer,
            descripcion: resp[a].descripcion,
          } as Iasignatura)
      );

      let lastInsertedId = 0;
      asigaturasActuales.forEach((carrera) => {
        const asignaturaId = parseInt(carrera.id);
        if (asignaturaId > lastInsertedId) {
          lastInsertedId = asignaturaId;
        }
      });

      this.papa.parse(file, {
        complete: (result: any) => {
          const headers = result.data[0];
          result.data.shift();
          const docentesFromCSV: Iasignatura[] = result.data
            .map((row: any) => {
              lastInsertedId++; // Generar el nuevo ID sumándole uno al último ID insertado
              const carrera: Iasignatura = {
                id: String(lastInsertedId),
                carrera: row[headers.indexOf('carrer')],
                descripcion: row[headers.indexOf('PERIODO_ACADEMICO')],
                nombre: row[headers.indexOf('CARRERA')],
              };
              // Validar que no haya campos vacíos o nulos
              if (!carrera.carrera || !carrera.descripcion || !carrera.nombre) {
                console.log('Registro del CSV con campos faltantes:', carrera);
                return null; // Salir del mapeo y no insertar este registro
              }

              return carrera;
            })
            .filter((carrera: Iasignatura | null) => carrera !== null); // Filtrar los registros nulos

          // Ahora que tienes los datos del CSV en docentesFromCSV, puedes insertarlos en la base de datos
          docentesFromCSV.forEach((carrera) => {
            this.asignaturaService
              .agregarAsignatura(carrera, localStorage.getItem('token'))
              .subscribe(
                (resp) => {
                  console.log('Docente insertado desde CSV:', carrera);
                  this.getData();
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
  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith',
  };
}
