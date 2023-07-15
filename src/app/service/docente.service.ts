import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${environment.urlFirebase}docentes.json`)
  }
}
