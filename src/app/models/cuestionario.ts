import { Pregunta } from "./pregunta";

export class Cuestionario {

   Id?: number;
   Nombre: string;
   Descripcion: string;
   FechaCreacion?: Date;
   ListadoPreguntas: Pregunta[];

   constructor(nombre:string, descripcion:string, fechaCreacion:Date, preguntas:Pregunta[]){
      this.Nombre = nombre;
      this.Descripcion = descripcion;
      this.FechaCreacion = fechaCreacion;
      this.ListadoPreguntas = preguntas;
   }
}