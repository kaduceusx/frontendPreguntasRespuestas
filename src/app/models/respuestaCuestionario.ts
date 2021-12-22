import { RespuestaCuestionarioDetalle } from './respuestaCuestionarioDetalle';

export class RespuestaCuestionario{
   cuestionarioId!: number;
   nombreParticipante: any;
   fecha?: any;
   id?: any;
   listadoRtaCuestionarioDetalle!: RespuestaCuestionarioDetalle[];
}