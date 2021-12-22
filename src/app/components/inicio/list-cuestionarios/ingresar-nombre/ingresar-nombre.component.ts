import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombreParticipante = '';

  constructor(private router: Router, 
              private respuestaCuestionario: RespuestaCuestionarioService) { 
          
  }

  ngOnInit(): void {
    if (this.respuestaCuestionario.idCuestionario == null){
      this.router.navigate(['/inicio']);
      return;
    }
  }

  siguiente():void {
    this.respuestaCuestionario.nombreParticipante = this.nombreParticipante;
    this.router.navigate(['/inicio/pregunta']);
  }

}
