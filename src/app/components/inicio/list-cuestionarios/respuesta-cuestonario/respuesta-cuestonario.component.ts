import { Component, OnInit } from '@angular/core';
import { Cuestionario } from '../../../../models/cuestionario';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respuesta-cuestonario',
  templateUrl: './respuesta-cuestonario.component.html',
  styleUrls: ['./respuesta-cuestonario.component.css']
})
export class RespuestaCuestonarioComponent implements OnInit {

  cuestionario!: Cuestionario;
  respuestaUsuario: number[] = [];

  constructor(private respuestaCuestionarioServices: RespuestaCuestionarioService,
              private router: Router) { 
          
  }

  ngOnInit(): void {
    if (this.respuestaCuestionarioServices == null) {
      this.router.navigate(['/inicio']);
    }else{
      this.cuestionario = this.respuestaCuestionarioServices.cuestionario;
      this.respuestaUsuario = this.respuestaCuestionarioServices.respuestas;
      console.log(this.cuestionario);
      console.log(this.respuestaUsuario);
    }
  }

}
