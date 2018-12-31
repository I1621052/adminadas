import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Habitacion } from '../../models/habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  totalHabitaciones: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
  ) { }

  //===================================================================
  cargarHabitaciones(desde: number = 0) {
    let url = URL_SERVICIOS + '/habitacion?desde=' + desde;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalHabitaciones = resp.total;
        return resp.habitaciones;
      }));
  }
  //===================================================================

  //===================================================================
  buscarHabitacion(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/habitaciones/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.habitaciones));
  }
  //===================================================================

  //===================================================================
  borrarHabitacion(id: string) {
    let url = URL_SERVICIOS + '/habitacion/' + id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.delete(url)
      .pipe(map(resp => swal('habitacion borrada', 'Eliminado correctamente', 'success')));
  }
  //===================================================================

  //===================================================================
  guardarHabitacion(habitacion: Habitacion) {
    let url = URL_SERVICIOS + '/habitacion';
    if(habitacion._id){
      //actualizando
      url += '/' + habitacion._id;
      url += '?token=' + this._usuarioServices.token;
      return this.http.put(url, habitacion)
      .pipe(map((resp:any)=>{
      swal('Habitacion actualizada', habitacion.numero, 'success');
      return resp.habitacion;
      }));
    }else{
      //creando
      url += '?token=' + this._usuarioServices.token;
      return this.http.post(url, habitacion)
        .pipe(map((resp: any) => {
          swal('Habitacion creado', habitacion.numero, 'success');
          return resp.habitacion;
        }));
    }


  }
  //===================================================================

  //===================================================================
  cargarHabitacion(id: string) {
    let url = URL_SERVICIOS + '/habitacion/' + id;
    return this.http.get(url)
    .pipe(map( (resp:any)=>resp.habitacion));
  }
  //===================================================================

}
