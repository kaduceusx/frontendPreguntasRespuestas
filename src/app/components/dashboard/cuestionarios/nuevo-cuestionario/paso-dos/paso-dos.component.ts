import { Component, OnInit } from '@angular/core';

import { CuestionarioService } from '../../../../../services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cuestionario } from '../../../../../models/cuestionario';
import { Pregunta } from '../../../../../models/pregunta';


@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {

  titiuloCuestionario!:string;
  descripcionCuestionario!: string;
  listadoPreguntas: Pregunta[] = [];

  constructor(
    private cuestionarioService:CuestionarioService,
    private toastr:ToastrService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.titiuloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta:Pregunta): void {
    this.listadoPreguntas.push(pregunta);
    console.log(this.listadoPreguntas);
  }

  eliminarPregunta(indice:number):void {
    this.listadoPreguntas.splice(indice, 1);
  }

  guardarCuestionario():void {
    const cuestionario: Cuestionario = {
      Nombre: this.titiuloCuestionario,
      Descripcion: this.descripcionCuestionario,
      ListadoPreguntas: this.listadoPreguntas
    }

    // console.log(cuestionario);

    //enviar cuestionario al backend
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data =>{
      this.toastr.success('El cuestionario se ha guardado exitosamente', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
    },error=>{
      this.toastr.error ("ha ocurrido un error", "Error");
      console.log(cuestionario);
    });
  }

}
