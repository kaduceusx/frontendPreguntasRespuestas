import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionarioDetalle } from 'src/app/models/respuestaCuestionarioDetalle';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  idCuestionario!: number;
  listPreguntas: Pregunta[] = [];
  rtaConfirmada = false;
  opcionSeleccionada: any;
  indice = 0;
  idRespuestaSeleccionada!: number | any;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(private respuestaCuestionarioServices: RespuestaCuestionarioService,
              private cuestionarioServices: CuestionarioService,
              private router: Router) { 
  
  }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioServices.idCuestionario;
    if (this.idCuestionario == null){
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionarioServices.respuestas = [];
  }

  getCuestionario(): void {
    this.cuestionarioServices.getCuestionario(this.idCuestionario).subscribe(data=>{
      console.log(data);
      this.listPreguntas = data.listadoPreguntas;
      this.respuestaCuestionarioServices.cuestionario = data;
    },error =>{

    });
  }

  obtenerPregunta():string {
    return this.listPreguntas[this.indice].descripcion;
  }

  getIndex():number{
    return this.indice;
  }

  respuestaSeleccionada(respuesta: any, idRespuesta: number):void{
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;
  }

  AddClassOption(respuesta:any):string{
    if (respuesta === this.opcionSeleccionada){
      return 'active text-light';
    }else{
      return '';
    }
  }

  siguiente():void {
    this.respuestaCuestionarioServices.respuestas.push(this.idRespuestaSeleccionada);
    console.log(this.respuestaCuestionarioServices.respuestas);

    //CREA UN OBJETO RESPUESTA-DETALLE
    const DETALLE_RESPUESTA: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    };

    /* ------------------------- agregar objeto al array ------------------------ */
    this.listRespuestaDetalle.push(DETALLE_RESPUESTA);

    this.rtaConfirmada = false;
    this.indice++;
    this.idRespuestaSeleccionada = null;

    if (this.indice === this.listPreguntas.length) {
      // this.router.navigate(['/inicio/respuestaCuestionario']);
      this.guardarRespuestaCuestionario();
    }
  }

  guardarRespuestaCuestionario():void{
    const RTA_CUESTIONARIO: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioServices.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioServices.nombreParticipante,
      listadoRtaCuestionarioDetalle: this.listRespuestaDetalle
    };

    console.log(RTA_CUESTIONARIO);

    this.respuestaCuestionarioServices.guardarRespuestaCuestionario(RTA_CUESTIONARIO).subscribe(data=>{
      this.router.navigate(['/inicio/respuestaCuestionario']);
    },error=>{
      console.log(error);
    });

  }

}
