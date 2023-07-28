import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  constructor(private router: Router, private authService: AuthService){}
  public rol: any = null;
  public email: string = '';
  public userUid: any = null;

  ngOnInit(){
    this.getCurrentUser();

  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.getRol(this.userUid).subscribe(
          (userRole: any) => {
            this.rol = userRole[this.userUid].rol[0];
            console.log(this.rol);
            
          }
        )
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl("/login");
  }


}
