import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
totalReservas: number = 0;
  constructor(
    public http: HttpClient
  ) { }

  cargarReservas(){
    let url = URL_SERVICIOS + '/reserva';
    return this.http.get(url)
    .pipe(map((resp: any)=>{
      this.totalReservas = resp.total;
      return resp.reservas;
    }));
  }

}
