import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Reserva } from '../../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  totalReservas: number = 0;
  constructor(
    public http: HttpClient,
    public _ususarioService: UsuarioService
  ) { }

  cargarReserva(id: string) {
    let url = URL_SERVICIOS + '/reserva/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.reserva));
  }

  cargarReservas() {
    let url = URL_SERVICIOS + '/reserva';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalReservas = resp.total;
        console.log(resp.reservas);

        return resp.reservas;
      }));
  }

  //=================================================buscar Reservas
  buscarReservas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/reservas/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.reservas));
  }
  borrarReserva(id: string) {
    let url = URL_SERVICIOS + '/reserva/' + id;
    url += '?token=' + this._ususarioService.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        swal('Reserva Borrado', 'correctamente', 'success');
        return resp;
      }));
  }

  guardarReserva(reserva: Reserva) {
    let url = URL_SERVICIOS + '/reserva';
    if (reserva._id) {
      //actualizando
      url += '/' + reserva._id;
      url += '?token=' + this._ususarioService.token;
      return this.http.put(url, reserva)
        .pipe(map((resp: any) => {
          swal('RESERVA', 'actualizado', 'success');
          return resp.reserva;
        }));
    } else {
      //creando
      url += '?token=' + this._ususarioService.token;
      return this.http.post(url, reserva)
        .pipe(map((resp: any) => {
          swal('Reserva creado', 'registrado con DNI: ' + reserva.dni, 'success');
          return resp.reserva;
        }));
    }
  }
}
