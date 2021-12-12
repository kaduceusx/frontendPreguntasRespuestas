import { Respuesta } from './respuesta';


export class Pregunta{
   descripcion: string;
   listadoRespuesta: Respuesta[];
   hide?: boolean;

   constructor(descripcion:string, respuestas:Respuesta[]){
      this.descripcion = descripcion;
      this.listadoRespuesta = respuestas;
      this.hide = true;
   }
}