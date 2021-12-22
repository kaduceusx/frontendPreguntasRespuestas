import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  idCuestionario: number;
  listRespuestaCuestionario: RespuestaCuestionario[] = [];

  constructor(private aRoute: ActivatedRoute, 
              private respuestaCuestionarioService: RespuestaCuestionarioService,
              private toastr: ToastrService) { 
    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getListCuestionarioServices();
  }

  getListCuestionarioServices():void{
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data=>{
      //console.log(data);
      this.listRespuestaCuestionario = data;
    },error=>{

    });
  }

  eliminarRespuestaCuestionario(idRtaCuestionario: number):void{
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data=>{
      this.toastr.info("La respuesta al cuestionario ha sido eliminada", "REGISTRO ELIMINADO");
      this.getListCuestionarioServices();
    }, error=>{
      this.toastr.error(error);
    }); 
  }

}
