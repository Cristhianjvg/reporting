// import { Component, AfterViewInit } from '@angular/core';
import { Component, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.llenarCombo();
    this.llenarGrid();
    var combo = document.getElementById('comboNombres') as HTMLSelectElement;
    combo.addEventListener('change', () => {
      this.filtrarGrid(combo.value);
    });
  }
  filtrarGrid(nombreSeleccionado: string) {
    var grid = document.getElementById('gridDatos') as HTMLTableElement;
    var filas = grid.getElementsByTagName('tr');

    for (var i = 1; i < filas.length; i++) {
      var celdaDocente = filas[i].getElementsByTagName('td')[1];
      var docente = celdaDocente.textContent;

      if (docente !== nombreSeleccionado) {
        filas[i].style.display = 'none';
      } else {
        filas[i].style.display = '';
      }
    }
  }
  

  llenarCombo() {
    var nombres = ['Jhon', 'Panchan', 'Larrea'];
    var combo = document.getElementById('comboNombres') as HTMLSelectElement;

    for (var i = 0; i < nombres.length; i++) {
      var option = document.createElement('option');
      option.text = nombres[i];
      combo.add(option);
    }
  }

  llenarGrid() {
    var datosGrid = [
      { actividad: 'Proyecto 1', docente: 'Larrea', asignatura: 'POO', fecha: '05/01/2022', calendario: 'Calendario 1' },
      { actividad: 'Proyecto 2', docente: 'Jhon', asignatura: 'WEB 2', fecha: '04/12/2023', calendario: 'Calendario 2' },
      { actividad: 'Proyecto 3', docente: 'Peroches', asignatura: 'ESTRUCTURA DE DATOS', fecha: '04/12/2022', calendario: 'Calendario 3' },
      { actividad: 'Proyecto 4', docente: 'Peroches', asignatura: 'ESTRUCTURA DE DATOS', fecha: '04/12/2022', calendario: 'Calendario 3' }

    ];

    var grid = document.getElementById('gridDatos') as HTMLTableElement;

    for (var i = 0; i < datosGrid.length; i++) {
      var row = grid.insertRow();

      var cellActividad = row.insertCell();
      cellActividad.textContent = datosGrid[i].actividad;

      var cellDocente = row.insertCell();
      cellDocente.textContent = datosGrid[i].docente;

      var cellAsignatura = row.insertCell();
      cellAsignatura.textContent = datosGrid[i].asignatura;

      var cellFecha = row.insertCell();
      cellFecha.textContent = datosGrid[i].fecha;

      var cellCalendario = row.insertCell();
      cellCalendario.textContent = datosGrid[i].calendario;
    }
  }
}
