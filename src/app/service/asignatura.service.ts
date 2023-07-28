import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { Iasignatura } from '../interface/iasignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${environment.urlFirebase}asignaturas.json`)
  }
  
  // new endpoint asignaturas
  eliminarTodo(token: any){
    return this.http.delete(`${environment.urlFirebase}asignaturas.json?auth=${token}`)
  }

  agregarAsignatura(data:Iasignatura, token:any){
    return this.http.post(
      `${environment.urlFirebase}asignaturas.json?auth=${token}}`, data
    );
  }
}
