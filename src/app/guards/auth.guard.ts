import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { environment } from 'src/enviroment/environment';
// import { CanLoad Route } from '@angular/router';
// import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient){}

  canActivate(): Promise<boolean>{

      return new Promise(resolve => {
        //validar si el token si existe
        if(localStorage.getItem('token') != null){

          //validar que el token es real

          let body = {
            idtoken: localStorage.getItem('token')
          }

          this.http.post(environment.urlGetUser, body).subscribe(
            resp =>{
              resolve(true);
            },
            err =>{
              console.log("no borre los tokens");
              resolve(false);
            }
          )
          resolve(true);
        }else{
          this.router.navigateByUrl("/login");
          resolve(false);
          
        }
      })
    
  }
  
}
