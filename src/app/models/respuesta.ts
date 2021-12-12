export class Respuesta{
   id?: number;
   descripcion: string;
   esCorrecta: boolean;

   constructor(descricion: string, esCorrecta: boolean, id?:number) {
      this.id = id;
      this.descripcion = descricion;
      this.esCorrecta = esCorrecta;
   }
}