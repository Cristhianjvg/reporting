import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../interface/usuarios';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${environment.urlFirebase}usuarios.json`)
  }

  postdata(data: Usuarios, token: any){
    return this.http.post(`${environment.urlFirebase}usuarios.json?auth=${token}`, data);  
  }
}
