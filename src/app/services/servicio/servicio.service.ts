import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Servicio } from '../../models/servicio.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  totalServicios: number = 0;
  servicio: Servicio;
  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
  ) { }
  //===========================================CARGAR SERVICIO
  cargarServicios() {
    let url = URL_SERVICIOS + '/servicio';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalServicios = resp.total;
        return resp.servicios;
      }));
  }
  //===========================================OBTENER SERVICIO
  obtenerServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.servicio));
  }
  //===========================================BORRAR SERVICIO

  borrarServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.delete(url)
      .pipe(map(resp => swal('Servicio borrada', 'Eliminado correctamente', 'success')));
  }

  //===========================================CREAR SERVICIO
  crearServicio(nombre: string) {
    let url = URL_SERVICIOS + '/servicio';
    url += '?token=' + this._usuarioServices.token;
    return this.http.post(url, { nombre }).
      pipe(map((resp: any) => resp.servicio))
  }

  //===========================================BUSCAR SERVICIO
  buscarServicio(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/servicios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.servicios));
  }

  //===========================================ACTUALIZAR SERVICIO
  actualizarServicio(servicio: Servicio) {
    let url = URL_SERVICIOS + '/servicio/' + servicio._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, servicio)
      .pipe(map((resp: any) => {
        swal('Servicio actualizado', servicio.nombre, 'success');
        return resp.categoria
      }));
  }

}

