export class Respuesta{
   Id?: number;
   Descripcion: string;
   EsCorrecta: boolean;

   constructor(descricion: string, esCorrecta: boolean, id?:number) {
      this.Id = id;
      this.Descripcion = descricion;
      this.EsCorrecta = esCorrecta;
   }
}