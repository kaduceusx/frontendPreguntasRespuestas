import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioService } from '../../../../../services/respuesta-cuestionario.service';
import { RespuestaCuestionarioDetalle } from '../../../../../models/respuestaCuestionarioDetalle';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit {

  idRespuesta: number;
  cuestionario!: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[] = [];

  constructor(private aRoute: ActivatedRoute, private respuestaCuestionarioService: RespuestaCuestionarioService) { 
    this.idRespuesta = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getListRespuestasYCuestionario();
  }

  getListRespuestasYCuestionario():void {
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data=>{
      // console.log(data);
      this.cuestionario = data.cuestionario;
      this.respuestas = data.respuestas;
    },error =>{
      console.log(error);
    });
  }

}
