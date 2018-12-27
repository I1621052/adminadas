import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';
import { NgZone } from '@angular/core';

declare function init_plugings();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;
  constructor(public _router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone) { }

  ngOnInit() {
    init_plugings();
    this.googleInit();
    //==============obtener email del localStorage
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  //====================================Google sesion
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '617741036821-kcpb6gjpm97d6lan1be37tdrv8lps4c5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;

      this.zone.run(() => {
        this._usuarioService.loginGoogle(token)
        .subscribe( isLogado => this._router.navigate(['/dashboard']));
      });
      //let profile = googleUser.getBasicProfile();
      //console.log(token);
    });
  }
  //====================================INGRESAR LOGIN
  ingresar(forma: NgForm) {
    if (forma.invalid) {
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
