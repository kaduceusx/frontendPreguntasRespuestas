import { Pregunta } from "./pregunta";
import { Usuario } from './usuario';

export class Cuestionario {

   id?: number;
   nombre: string;
   descripcion: string;
   fechaCreacion?: Date;
   listadoPreguntas: Pregunta[];
   usuario?: Usuario

   constructor(nombre:string, descripcion:string, fechaCreacion:Date, usuario: Usuario, preguntas:Pregunta[]){
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.fechaCreacion = fechaCreacion;
      this.usuario = usuario;
      this.listadoPreguntas = preguntas;
   }
}