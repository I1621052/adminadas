import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }
  //===========Esta logeado
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  //=========================================Cerrar Sesion
  logout() {
    this.usuario = null;
    this.token = '';
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
    this.token = token;
  }
  //=========================================Login Google
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
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

  //==========================================ACTUALIZAR USUARIO
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(map((resp: any) => {
        if(usuario._id===this.usuario._id){
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }
        //this.usuario = resp.usuario;
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }));
  }
  //=============================================CAMBIAR IMAGEN
  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      })
  }
  //================================================cargarUsuarios
  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }
  //=================================================buscar Usuarios
  buscarUsuario( termino:string){
    let url=URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
    .pipe(map((resp:any)=> resp.usuarios));
  }
  //================================================BORRAR USUARIO
  borrarUsuario(id: string){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
    .pipe(map(resp=>{
        swal('Usuario borrado', 'Eliminado correctamente', 'success');
        return true;
    }));
  }
}
