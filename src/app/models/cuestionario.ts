import { Pregunta } from "./pregunta";

export class Cuestionario {

   id?: number;
   nombre: string;
   descripcion: string;
   fechaCreacion?: Date;
   listadoPreguntas: Pregunta[];

   constructor(nombre:string, descripcion:string, fechaCreacion:Date, preguntas:Pregunta[]){
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.fechaCreacion = fechaCreacion;
      this.listadoPreguntas = preguntas;
   }
}