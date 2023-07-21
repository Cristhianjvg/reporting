import { Component, AfterViewInit } from '@angular/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';
import { CarrerasService } from 'src/app/service/carreras.service';
import { Carreras } from 'src/app/interface/carreras';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements AfterViewInit { 

  constructor(private docentesService: DocenteService,private carrerasService: CarrerasService){

  }

  ngAfterViewInit() {
  this.getDocentes();
  this.getCarreras();
  }

  
  docentes: Idocentes[] = [];
  carreras: Carreras[] = [];
  public DocentesData: Array<{ text: string; value: number }> = [];
  public CarrerasData: Array<{ text: string; value: number }> = [];
  
  getDocentes(){
    this.docentesService.getData().subscribe((resp: any)=> {
      this.docentes = Object.keys(resp).map(a => ({
        
        id: resp[a].id,
        apellido: resp[a].apellido,
        celular: resp[a].celular,
        email: resp[a].email,
        nombre: resp[a].nombre
      }) as Idocentes)
      this.DocentesData = this.docentes.map((docente: Idocentes) => {
        return { text: docente.nombre, value: parseInt(docente.id, 10)  };
      });
    });
    console.log(this.docentes);
    
    
    
  }

  getCarreras(){
    this.carrerasService.getData().subscribe((resp: any)=> {
      this.carreras = Object.keys(resp).map(a => ({
        id: resp[a].id,
        nombre: resp[a].nombre,
      }) as Carreras)
    });
    console.log()
    this.CarrerasData = this.carreras.map((carreras: Carreras) => {
      return { text: carreras.nombre, value: parseInt(carreras.id, 10)  };
    });
    console.log(this.CarrerasData);
    
  }
  

  

  public AsignaturasData: Array<{ text: string; value: number }> = [
    { text: "etica", value: 1 },
    { text: "programacion", value: 2 },
    { text: "base de datos", value: 3 },
    { text: "diseño", value: 4 },
  ];

  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: "startsWith",
  };
  

  
}
