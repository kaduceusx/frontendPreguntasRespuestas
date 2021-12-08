import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  cambiarPassword!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, {validator:this.checkPassword});
  }

  checkPassword(group: FormGroup):any {
    const pass = group.controls.nuevaPassword.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  guardarPassword():void {
    console.log(this.cambiarPassword);

    const changePassword:any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    };

    console.log(changePassword);
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data=>{
      this.toastr.info(data.message);
      this.router.navigate(['/dashboard']);
    },error =>{
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error')
    });
  }

  ngOnInit(): void {
  }

}
