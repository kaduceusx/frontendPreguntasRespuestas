import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register!: FormGroup
  loading = false;

  constructor(private fb: FormBuilder, 
              private usuarioServices: UsuarioService,
              private router:Router,
              private toastr: ToastrService) { 
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)] ],
      confirmaPassword: ['']
    }, {validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  registrarUsuario():void {
    console.log(this.register);
    const usuario: Usuario = {
      NombreUsuario: this.register.value.usuario,
      Password: this.register.value.password
    };

    this.loading = true;

    this.usuarioServices.saveUser(usuario).subscribe(data =>{
      console.log(data);
      this.toastr.success(`El usuario ${usuario.NombreUsuario} ha sido registrado con exito`, 'Usuario Registrado');
      this.router.navigate(['/inicio/login']);
      this.loading = false;
    }, error =>{
      this.loading = false;
      console.log(error);
      this.register.reset();
      this.toastr.error(error.error.message, 'Error');
    });
  }

  checkPassword(group: FormGroup):any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmaPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

}
