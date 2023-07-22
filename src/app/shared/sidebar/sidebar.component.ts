import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl("/login");
  }

}
