import { Injectable } from '@angular/core';
import { Ilogin } from '../interface/login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private afsAuth: AngularFireAuth) { }

  

  // login(data: Ilogin){
  //   return this.http.post(environment.urlLogin, data).pipe(
  //     tap((resp:any) => {

        // localStorage.setItem("token", resp.idToken);
        // localStorage.setItem("refreshToken", resp.refreshToken);
        
  //     })
  //   );

  // }

}