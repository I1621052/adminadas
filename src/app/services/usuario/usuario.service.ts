import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('Servicio de ususario listo');
    this.cargarStorage();
  }
  //===========Esta logeado
  estaLogueado(){
    return ( this.token.length>5)? true: false;
  }
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }
  //=========================================Cerrar Sesion
  logout(){
    this.usuario = null;
    this.token='';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  //===========LocalStorage
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token= token;
  }
  //=========================================Login Google
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
    .pipe(map((resp: any)=>{
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  //=========================================LOGIN
  login(usaurio: Usuario, recordar = false) {
    //==================Recordar
    if (recordar) {
      localStorage.setItem('email', usaurio.email);
    } else {
      localStorage.removeItem('email');
    }
    //==================EndRecordar

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usaurio)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        /*localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));*/
        return true;
      }));
  }

  //=========================================CREAR USUARIO
  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }
}
