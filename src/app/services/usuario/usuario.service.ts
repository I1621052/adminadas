import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de ususario listo');
  }
  //=========================================LOGIN
  login(usaurio: Usuario, recordar = false) {
    //==================Recordar
    if (recordar) {
      localStorage.setItem('email', usaurio.email);
    }else{
      localStorage.removeItem('email');
    }
    //==================EndRecordar
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usaurio)
      .pipe(map((resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
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
