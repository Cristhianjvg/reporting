import { Injectable } from '@angular/core';
import { Ilogin } from '../interface/login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  login(data: Ilogin){
    return this.http.post(environment.urlLogin, data).pipe(
      map((resp:any) => {

        localStorage.setItem("token", resp.idToken);
        localStorage.setItem("refreshToken", resp.refreshToken);
      })
    );

  }
}
