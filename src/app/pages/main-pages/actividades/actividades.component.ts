import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements AfterViewInit { 
  ngAfterViewInit() {
  this.llenarCombo();
  this.llenarGrid();
}

  

  llenarCombo() {
    var comboCarreras = document.getElementById('comboCarreras') as HTMLSelectElement;
    var comboAsignaturas = document.getElementById('comboAsignaturas') as HTMLSelectElement;
    var comboDocentes = document.getElementById('comboDocentes') as HTMLSelectElement;

    var carreras = ['Carrera 1', 'Carrera 2', 'Carrera 3'];
    var asignaturas = ['Asignatura 1', 'Asignatura 2', 'Asignatura 3'];
    var docentes = ['Docente 1', 'Docente 2', 'Docente 3'];

    for (var i = 0; i < carreras.length; i++) {
      var option = document.createElement('option');
      option.text = carreras[i];
      comboCarreras.add(option);
    }

    for (var i = 0; i < asignaturas.length; i++) {
      var option = document.createElement('option');
      option.text = asignaturas[i];
      comboAsignaturas.add(option);
    }

    for (var i = 0; i < docentes.length; i++) {
      var option = document.createElement('option');
      option.text = docentes[i];
      comboDocentes.add(option);
    }
  }
  llenarGrid() {
    var datosGrid = [
      { carrera: 'Proyecto 1', docente: 'Larrea',actividad: 'POO' ,pao: 'POO', email: '05/01/2022', fechaInicio: 'Calendario 1', fechaFin: 'Calendario 1' },
      { carrera: 'Proyecto 2', docente: 'Jhon  ',actividad: 'WE ' ,pao: 'WE ', email: '04/12/2023', fechaInicio: 'Calendario 2', fechaFin: 'Calendario 2' },
      { carrera: 'Proyecto 3', docente: 'Peroch',actividad: 'EST' ,pao: 'EST', email: '04/12/2022', fechaInicio: 'Calendario 3', fechaFin: 'Calendario 3' },
      { carrera: 'Proyecto 4', docente: 'Peroes',actividad: 'EST' ,pao: 'EST', email: '04/12/2022', fechaInicio: 'Calendario 3', fechaFin: 'Calendario 3' }

    ];

    var grid = document.getElementById('gridDatos') as HTMLTableElement;

    for (var i = 0; i < datosGrid.length; i++) {
      var row = grid.insertRow();

      var cellCarrera = row.insertCell();
      cellCarrera.textContent = datosGrid[i].carrera;

      var cellDocente = row.insertCell();
      cellDocente.textContent = datosGrid[i].docente;

      var cellActividad = row.insertCell();
      cellActividad.textContent = datosGrid[i].actividad;

      var cellPao = row.insertCell();
      cellPao.textContent = datosGrid[i].pao;

      var cellEmail = row.insertCell();
      cellEmail.textContent = datosGrid[i].email;

      var cellFechaInicio = row.insertCell();
      cellFechaInicio.textContent = datosGrid[i].fechaInicio;

      var cellFechaFin = row.insertCell();
      cellFechaFin.textContent = datosGrid[i].fechaFin;
    }

    
  }
  asignarActividad() {
    const comboCarreras = document.getElementById('comboCarreras') as HTMLSelectElement;
    const comboDocentes = document.getElementById('comboDocentes') as HTMLSelectElement;
    const fechaInicio = document.getElementById('fechaInicio') as HTMLInputElement;
    const fechaFin = document.getElementById('fechaFin') as HTMLInputElement;
    const comboAsignaturas = document.getElementById('comboAsignaturas') as HTMLSelectElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const actividad = document.getElementById('actividad') as HTMLTextAreaElement;

    if (
      comboCarreras &&
      comboDocentes &&
      fechaInicio &&
      fechaFin &&
      comboAsignaturas &&
      email &&
      actividad &&
      this.validarEmail(email.value) &&
      this.validarFechas(fechaInicio.value, fechaFin.value)
    ) {
      // Realizar la acción de asignar
      // Aquí puedes implementar la lógica para asignar la actividad
      // Por ejemplo, puedes enviar los datos al servidor a través de una solicitud AJAX

      // Ejemplo de solicitud AJAX utilizando la librería Fetch:
      fetch('/ruta-de-destino', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Datos a enviar al servidor
          // Puedes utilizar las variables definidas en el evento del botón
          comboCarreras,
          comboDocentes,
          fechaInicio: fechaInicio.value,
          fechaFin: fechaFin.value,
          comboAsignaturas,
          email: email.value,
          actividad: actividad.value
        })
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor
          console.log(data);
        })
        .catch(error => {
          // Manejar errores en la solicitud
          console.error('Error:', error);
        });
    } else {
      // Mostrar mensaje de error o realizar otra acción en caso de campos incompletos o inválidos
      alert('Por favor, completa todos los campos correctamente antes de asignar.');
    }
  }

  validarEmail(email: string): boolean {
    // Código de validarEmail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  validarFechas(fechaInicio: string, fechaFin: string): boolean {
    // Código de validarFechas
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    return fechaInicioObj < fechaFinObj;
  }


}
