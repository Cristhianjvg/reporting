import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  classList: any;

  Responsivo(){
        // add hovered class to selected list item
        let list = document.querySelectorAll(".navigation1 li");
    
        const activeLink = () => {
          list.forEach((item) => {
            item.classList.remove("hovered");
          });
          this.classList.add("hovered");
        }
        
        let navigation: Element | null;
        list.forEach((item) => item.addEventListener("mouseover", activeLink));

        // Menu Toggle
        let toggle: Element | null;
        toggle = document.querySelector(".toggle1");
        navigation = document.querySelector(".navigation1");
        let main = document.querySelector(".main1");
        console.log("hola");

        if (navigation !== null) {
          navigation.classList.toggle("active");
        }

        if (main !== null) {
          main.classList.toggle("active");
        }

  }

}
