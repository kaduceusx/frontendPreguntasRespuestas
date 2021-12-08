import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  loading:boolean = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private loginService: LoginService) { 
    this.login = this.fb.group({
      usuario : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  log():void {

    console.log(this.login);

    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    };

    console.log(usuario);
    this.loading= true;

    this.loginService.login(usuario).subscribe(data=>{
      console.log(data);
      this.loading = false;
      this.loginService.setLocalStorage(data);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
      this.login.reset();
    });

    /* setTimeout(()=>{
      if(usuario.nombreUsuario === "fserna" && usuario.password === '1234'){
        this.login.reset();
        this.router.navigate(['/dashboard']);
      }else{
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
        this.login.reset();
      }
      this.loading = false;
    }, 1000); */

  }

  ngOnInit(): void {
  }

}
