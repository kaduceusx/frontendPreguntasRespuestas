import { Respuesta } from './respuesta';


export class Pregunta{
   Descripcion: string;
   ListadoRespuesta: Respuesta[];
   Hide?: boolean;

   constructor(descripcion:string, respuestas:Respuesta[]){
      this.Descripcion = descripcion;
      this.ListadoRespuesta = respuestas;
      this.Hide = true;
   }
}