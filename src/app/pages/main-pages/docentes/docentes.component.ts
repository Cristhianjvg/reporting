import { Component, OnInit } from '@angular/core';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';


@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit{

  docentes: Idocentes[] = [];
  constructor(private docenteService: DocenteService){}
  
  ngOnInit(): void{
    this.getDocentes;
  }

  

  getDocentes(){
    this.docenteService.getData().subscribe((resp: any)=> {

      let position = 1;
      this.docentes = Object.keys(resp).map(a => ({

        id:a,
        apellido: resp[a].apellido,
        celular: resp[a].celular,
        email: resp[a].email,
        nombre: resp[a].nombre

      }) as Idocentes)
    } 

    )
  }
}
