import { Component, AfterViewInit } from '@angular/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Idocentes } from 'src/app/interface/idocentes';
import { DocenteService } from 'src/app/service/docente.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements AfterViewInit { 

  constructor(private docentesService: DocenteService){

  }

  ngAfterViewInit() {
  this.getDocentes();
  }
  
  docentes: Idocentes[] = [];
  public DocentesData: Array<{ text: string; value: number }> = [
    { text: "etica", value: 1 },
  ];
  
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

  public CarrerasData: Array<{ text: string; value: number }> = [
    { text: "Computacion", value: 1 },
    { text: "Derecho", value: 2 },
    { text: "Medicina", value: 3 },
    { text: "arquitectura", value: 4 },
  ];

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
