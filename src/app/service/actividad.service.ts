import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { Iactividad } from '../interface/iactividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http: HttpClient) { }
  //delete todo grid
  deleteAllData(token: any) {
    return this.http.delete(`${environment.urlFirebase}actividades.json?auth=${token}`);
  }

  getFilterData(orderBy: string, equalTo: string){

    return this.http.get(`${environment.urlFirebase}actividades.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
  }

  getData(){
    return this.http.get(`${environment.urlFirebase}actividades.json`)
  }

  postdata(data: Iactividad, token: any){
    return this.http.post(`${environment.urlFirebase}actividades.json?auth=${token}`, data);  
  }

}
