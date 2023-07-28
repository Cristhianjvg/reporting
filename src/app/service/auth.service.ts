import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Ilogin } from '../interface/login';
import { environment } from 'src/enviroment/environment';
import { Usuarios } from '../interface/usuarios';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private afsAuth: AngularFireAuth) { }

  token(data: Ilogin){
    return this.http.post(environment.urlLogin, data).pipe(
      tap((resp:any) => {

        localStorage.setItem("token", resp.idToken);
        localStorage.setItem("refreshToken", resp.refreshToken);
        
      })
    );
  }

  loginEmailUser(email: string, password: string){
    
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData),
      err => reject(err));
    })
  }

  registerUser(rol: string[], email: string, password: string, token: any){
    console.log("llego a registrar usuario");
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password).then(userData => {
        this.updateUserData(rol, userData.user, token).subscribe(resp => resolve(userData))
      }).catch(err => console.log(err))
    });
  }

  getData(){
    return this.http.get(`${environment.urlFirebase}usuarios.json`)
  }

  // postdata(data: Usuarios, token: any){
  //   return this.http.post(`${environment.urlFirebase}usuarios.json?auth=${token}`, data);  
  // }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  updateUserData(rol: string[], user: any, token: any){
    const data: Usuarios = {
      id: user.uid,
      email: user.email,
      rol: rol
    };

    return this.http.put(`${environment.urlFirebase}usuarios/${data.id}.json?auth=${token}`, data)
  }

  getRol(userUid: any){
    let orderBy = 'id';
    return this.http.get(`${environment.urlFirebase}usuarios.json?orderBy="${orderBy}"&equalTo="${userUid}"&print=pretty`);
  }
}