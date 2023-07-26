import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { ICarreras } from '../interface/Icarreras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarraraService {
  constructor(private http: HttpClient) {}

  agregarCarrera(data: ICarreras, token: any) {
    return this.http.post(
      `${environment.urlFirebase}carrera.json?auth=${token}`,
      data
    );
  }

  obtenerCarreraPorId(id: number, token: any) {
    return this.http.get(`${environment.urlFirebase}/carreras/${id}`);
  }

  obtenerTodasLasCarreras() {
    return this.http.get(`${environment.urlFirebase}carrera.json`);
  }

  actualizarCarrera(carrera: ICarreras) {
    return this.http.put(
      `${environment.urlFirebase}/carreras/${carrera.id}`,
      carrera
    );
  }

  eliminarCarrera(id: number) {
    return this.http.delete(`${environment.urlFirebase}/carreras/${id}`);
  }


  eliminarTodo(token: any) {
    return this.http.delete(`${environment.urlFirebase}carreras.json?auth=${token}`);
  }
}

