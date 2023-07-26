import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { Idocentes } from '../interface/idocentes';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }
  //delete todo grid
  deleteAllData(token: any) {
    return this.http.delete(`${environment.urlFirebase}docentes.json?auth=${token}`);
  }

  getFilterData(orderBy: string, equalTo: string){

    return this.http.get(`${environment.urlFirebase}docentes.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
    
  }

  getData(){
    return this.http.get(`${environment.urlFirebase}docentes.json`)
  }

  postdata(data: Idocentes, token: any){
    return this.http.post(`${environment.urlFirebase}docentes.json?auth=${token}`, data);  
  }
}
