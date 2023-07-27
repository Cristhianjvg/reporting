// import { Component, AfterViewInit } from '@angular/core';
import { Component, AfterViewInit } from '@angular/core';
import {Storage, ref, uploadBytes} from '@angular/fire/storage';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements AfterViewInit {


  constructor(private storage: Storage){

  }

  ngAfterViewInit() {
  }
  

  subirArchivos(event: any){
    const file = event.target.files[0];
    const archRef = ref(this.storage, `pdfs/${file.name}`);

    uploadBytes(archRef, file).then(x => {
      console.log(x);
    }).catch(error => console.log(error));
  }
}
