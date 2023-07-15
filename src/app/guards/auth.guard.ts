import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise(resolve => {
        //validar si el token si existe
        if(localStorage.getItem('token') != null){

          //validar que el token es real

          let body = {
            idtoken: localStorage.getItem('token')
          }

          // this.http.post(environment.urlGetUser, body).subscribe(
          //   resp =>{
          //     resolve(true);
          //   },
          //   err =>{
          //     localStorage.removeItem('token');
          //     localStorage.removeItem('refreshToken');
          //     console.log('hay error');
          //     resolve(false);
          //   }
          // )
          resolve(true);
        }else{
          this.router.navigateByUrl("/login");
          console.log("sali");
          resolve(false);
          
        }
      })
    
  }
  
}
