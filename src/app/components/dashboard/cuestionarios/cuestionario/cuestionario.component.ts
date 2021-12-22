import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from '../../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  idCuestionario:number;
  cuestionario: any = {};

  constructor(private cuestionarioService: CuestionarioService,
              private activeRoute: ActivatedRoute) { 
                //Obtiene el id cuestionario de la ruta http get y lo pasa a numero
                this.idCuestionario = +this.activeRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{
      console.log(data);
      this.cuestionario = data;
    },error=>{
      console.log(error);
    });
  }



}
