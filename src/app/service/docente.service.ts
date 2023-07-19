import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { Idocentes } from '../interface/idocentes';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${environment.urlFirebase}docentes.json`)
  }

  postdata(data: Idocentes, token: any){
    return this.http.post(`${environment.urlFirebase}docentes.json?auth=${token}`, data);  
  }
}
