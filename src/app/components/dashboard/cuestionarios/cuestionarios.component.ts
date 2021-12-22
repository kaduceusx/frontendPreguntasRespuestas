import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {

  nombreUsuario!:string;
  listCuestionarios: Cuestionario[] = [];

  constructor(private loginService: LoginService,
              private cuestionarioService: CuestionarioService,
              private toastr: ToastrService ) { 
    
  }

  ngOnInit(): void {
    //this.getNombreUsuario();
    this.getCuestionariosByUser();
  }

  getNombreUsuario():void {
    this.nombreUsuario =  this.loginService.getTokenDecoded().sub;
  }

  getCuestionariosByUser():void {
    this.cuestionarioService.getlistCuestionariosByUser().subscribe(data => {
      //console.log(data);
      this.listCuestionarios = data;
    }, error=>{
      console.log(error);
    });
  }

  borrarCuestionario(idCuestionario: number){
    if (confirm('Esta seguro que desea borrar este cuestionario?')){
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data=>{
        this.toastr.success('El cuestionario ha sido eliminado correctamente', 'Cuestionario Borrado');
        this.getCuestionariosByUser();
      },error=>{
        // this.toastr.error('Ops, ha ocurrido un error', 'Error');
      });
    }
  }

}
