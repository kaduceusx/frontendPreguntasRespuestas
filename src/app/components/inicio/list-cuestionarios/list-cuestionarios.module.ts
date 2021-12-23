import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCuestionariosRoutingModule } from './list-cuestionarios-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { RespuestaCuestonarioComponent } from './respuesta-cuestonario/respuesta-cuestonario.component';


@NgModule({
  declarations: [
    IngresarNombreComponent,
    PreguntaComponent,
    RespuestaCuestonarioComponent
  ],
  imports: [
    CommonModule,
    ListCuestionariosRoutingModule,
    SharedModule
  ]
})
export class ListCuestionariosModule { }
