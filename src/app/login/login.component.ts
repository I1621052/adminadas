import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugings();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  constructor(public _router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugings();
    //==============obtener email del localStorage
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1){
      this.recuerdame = true;
    }
  }
  //====================================INGRESAR LOGIN
  ingresar(forma: NgForm) {
    if(forma.invalid){
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(correcto => this._router.navigate(['/dashboard']));
    //console.log(forma.valid);
    //console.log(forma.value);

    //console.log("ingresando");
    //this._router.navigate(['/dashboard']);
  }

}
