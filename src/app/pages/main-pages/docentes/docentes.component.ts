import { Component, OnInit } from '@angular/core';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { alerts } from 'src/app/helpers/alerts';
import { functions } from 'src/app/helpers/functions';
import { CarrerasService } from 'src/app/service/carreras.service';
import { Carreras } from 'src/app/interface/carreras';
import { Papa } from 'ngx-papaparse'; // Importa el módulo Papa para parsear CSV


@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css'],
})
export class DocentesComponent implements OnInit {
  docentes: Idocentes[] = [];
  position: string = '0';
  lastId: number = 0;
  public page!: number;
  filterPipe = '';

  public f = this.form.group({
    nombre: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*')],
    ],
    apellido: ['', Validators.required],
    cedula: ['', [Validators.required]],
    celular: [''],
    email: ['', [Validators.required, Validators.email]],
    // asignatura: ['', Validators.required],
  });
  formSubmitted = false;
  errorForm = '';

  constructor(
    private docenteService: DocenteService,
    private form: FormBuilder,
    private carrerasService: CarrerasService,
    private papa: Papa
  ) {}

  ngOnInit(): void {
    this.getDocentes();
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
      this.f.controls['nombre'].disable();
      this.f.controls['apellido'].disable();
      this.f.controls['cedula'].disable();
      this.f.controls['celular'].disable();
      this.f.controls['email'].disable();
      // this.f.controls['asignatura'].disable();
    } else {
      this.f.controls['nombre'].enable();
      this.f.controls['apellido'].enable();
      this.f.controls['cedula'].enable();
      this.f.controls['celular'].enable();
      this.f.controls['email'].enable();
      // this.f.controls['asignatura'].enable();
    }
  }

  getDocentes() {
    this.docenteService.getData().subscribe((resp: any) => {
      this.docentes = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            apellido: resp[a].apellido,
            nombre: resp[a].nombre,
            cedula: resp[a].cedula,
            celular: resp[a].celular,
            email: resp[a].email,
            // asignatura: resp[a].asignatura,
          } as Idocentes)
      );
    });
    console.log(this.docentes);
  }

  // delete tools grid
  eliminarTodosLosDocentes() {
    const token = 'TuTokenDeAutenticacion'; // Reemplaza esto con tu token de autenticación
    this.docenteService.deleteAllData(token).subscribe(
      () => {
        console.log('Todos los docentes eliminados exitosamente');
      },
      (error) => {
        console.error('Error al eliminar los docentes:', error);
      }
    );
  }

  crearDocente() {
    this.formSubmitted = true;

    if (this.csvEnabled) {
      // Insertar docentes desde el archivo CSV
      const archivoCSVInput = document.getElementById(
        'archivoCSV'
      ) as HTMLInputElement;

      if (archivoCSVInput?.files?.length) {
        const file = archivoCSVInput.files[0];
        this.parseCSV(file);
      }
    } else {
      if (this.f.invalid) {
        return;
      }

      console.log(this.lastId);
      this.docentes.forEach((docente) => {
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
        cedula: this.f.controls.cedula.value ?? '',
        apellido: this.f.controls.apellido.value ?? '',
        celular: this.f.controls.celular.value,
        email: this.f.controls.email.value ?? '',
        estado: 0,
        // asignatura: this.f.controls.asignatura.value ?? '',
      };

      this.docenteService
        .postdata(dataDocente, localStorage.getItem('token'))
        .subscribe(
          (resp) => {
            alerts.basicAlert('OK', 'el docente fue guardado', 'success');
            this.getDocentes();
          },
          (err) => {
            alerts.basicAlert(
              'Error',
              'no se pudo guardar el docente',
              'error'
            );
            console.log(err);
          }
        );
    }
  }

  parseCSV(file: File) {
    this.docenteService.getData().subscribe((resp: any) => {
      const docentesActuales: Idocentes[] = Object.keys(resp).map(
        (a) =>
          ({
            id: resp[a].id,
            apellido: resp[a].apellido,
            nombre: resp[a].nombre,
            cedula: resp[a].cedula,
            celular: resp[a].celular,
            email: resp[a].email,
            // asignatura: resp[a].asignatura,
          } as Idocentes)
      );

      let lastInsertedId = 0;
      docentesActuales.forEach((docente) => {
        const docenteId = parseInt(docente.id);
        if (docenteId > lastInsertedId) {
          lastInsertedId = docenteId;
        }
      });

      this.papa.parse(file, {
        complete: (result) => {
          const headers = result.data[0];
          result.data.shift();
          const docentesFromCSV: Idocentes[] = result.data
            .map((row: any) => {
              lastInsertedId++; // Generar el nuevo ID sumándole uno al último ID insertado
              const docente: Idocentes = {
                id: String(lastInsertedId),
                nombre: row[headers.indexOf('DOCENTE')],
                apellido: row[headers.indexOf('DOCENTE')],
                cedula: row[headers.indexOf('NÚMERO_DE_CÉDULA ')],
                celular: row[headers.indexOf('NÚMERO_DE_CÉDULA ')],
                email: row[headers.indexOf('EMAIL')],
                estado: 0
                // asignatura: row[headers.indexOf('ASIGNATURA')],
              };

              // Validar que no haya campos vacíos o nulos
              if (
                !docente.nombre ||
                !docente.apellido ||
                !docente.cedula ||
                !docente.celular ||
                !docente.email 
                // docente.asignatura
              ) {
                console.log('Registro del CSV con campos faltantes:', docente);
                return null; // Salir del mapeo y no insertar este registro
              }

              return docente;
            })
            .filter((docente: Idocentes | null) => docente !== null); // Filtrar los registros nulos

          // Ahora que tienes los datos del CSV en docentesFromCSV, puedes insertarlos en la base de datos
          docentesFromCSV.forEach((docente) => {
            this.docenteService
              .postdata(docente, localStorage.getItem('token'))
              .subscribe(
                (resp) => {
                  console.log('Docente insertado desde CSV:', docente);
                  this.getDocentes();
                },
                (err) => {
                  console.error('Error al insertar docente desde CSV:', err);
                }
              );
          });
        },
      });
    });
  }

  deleteDocente(id: string){
    // this.docenteService.getFilterData(id, )
  }

  editarDocente(){

  }

  invalidField(field: string) {
    return functions.invalidField(field, this.f, this.formSubmitted);
  }
}
