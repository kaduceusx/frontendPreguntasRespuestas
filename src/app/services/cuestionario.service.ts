import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cuestionario } from '../models/cuestionario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  myAppUrl:string;
  myApiUrl:string;
  tituloCuestionario!: string;
  descripcionCuestionario!: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = '/api/Cuestionario/';
  }

  guardarCuestionario(cuestionario:Cuestionario):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, cuestionario);
  }

  getlistCuestionariosByUser():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarioByUser');
  }

  deleteCuestionario(idCuestionario: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + idCuestionario);
  }

  getCuestionario(idCuestionario: number):Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
  }

  getListCuestionarios():Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarios');
  }
}
