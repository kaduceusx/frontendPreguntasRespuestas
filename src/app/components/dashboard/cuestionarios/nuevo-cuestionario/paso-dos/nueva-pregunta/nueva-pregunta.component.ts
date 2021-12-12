import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pregunta } from 'src/app/models/pregunta';
import { ToastrService } from 'ngx-toastr';

import { FormArray } from '@angular/forms';
import { Respuesta } from 'src/app/models/respuesta';



@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  nuevaPregunta: FormGroup;
  pregunta!: Pregunta;
  respuestaCorrecta = 0;
  
  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  constructor(private fb:FormBuilder, private toastr:ToastrService) { 
    this.nuevaPregunta = fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([
        
      ])
    })
  }

  ngOnInit(): void {
    this.agregarRespuestasPorDefecto();
  }

  //Devuelve FormArray de respuestas
  get obtenerRespuestas():FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  //Agregar respuestas al array
  agregarRespuesta():void {
    this.obtenerRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }));
  }

  agregarRespuestasPorDefecto():void{
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  borrarRespuesta(indice:number):void {
    if(this.obtenerRespuestas.length == 2){
      this.toastr.error('Como mínimo la pregunta debe tener 2 respuestas', 'Error');
    }else{
      this.obtenerRespuestas.removeAt(indice);
    }
  }

  setRespuestaValida(indice:number):void {
    this.respuestaCorrecta = indice;
  }

  agregarPregunta():void {
    //Obtener titulo
    const descripcionPregunta = this.nuevaPregunta.get('titulo')?.value;

    //Obtener array de las respuestas
    const arrayRespuestas = this.nuevaPregunta.get('respuestas')?.value;

    //Crear array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element:any, indice:number) => {
      const respuesta:Respuesta = new Respuesta(element.descripcion, false);

      if (indice === this.respuestaCorrecta){
        respuesta.EsCorrecta = true;
      }

      arrayRta.push(respuesta);
    });

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);

    // console.log(pregunta);
    this.enviarPregunta.emit(pregunta)
    this.reset();
  }

  reset():void {
    this.respuestaCorrecta = 0; 
    this.nuevaPregunta.reset();
    this.obtenerRespuestas.clear();
    this.agregarRespuestasPorDefecto();
  }

}
