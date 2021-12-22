import { Component, OnInit } from '@angular/core';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit {

  listCuestionarios: Cuestionario[] = [];

  constructor(private cuestionarioService: CuestionarioService,
              private router: Router,
              private respuestaCuestionario: RespuestaCuestionarioService) { 
    
  }

  ngOnInit(): void {
    this.getListCuestionarios();
  }

  getListCuestionarios(): void {
    this.cuestionarioService.getListCuestionarios().subscribe(data=>{
      console.log(data);
      this.listCuestionarios = data;
    }, error=>{
      console.log(error);
    });
  }

  ingresarNombre(idCuestionario: number): void {
    this.respuestaCuestionario.idCuestionario = idCuestionario;
    this.router.navigate(['/inicio/ingresarNombre']);
  }

}
