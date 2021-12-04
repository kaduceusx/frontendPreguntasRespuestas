import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  loading:boolean = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) { 
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
    setTimeout(()=>{
      if(usuario.nombreUsuario === "fserna" && usuario.password === '1234'){
        this.router.navigate(['/dashboard']);
        this.login.reset();
      }else{
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
        this.login.reset();
      }
      this.loading = false;
    }, 3000);


 

  }

  ngOnInit(): void {
  }

}
