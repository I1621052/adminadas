import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva/reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: []
})
export class ReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  constructor(
    public _reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this._reservaService.cargarReservas()
      .subscribe(reservas => this.reservas = reservas);
  }

  buscarReserva(termino: string) {
    if (termino.length <= 0) {
      this.cargarReservas();
      return;
    }
    this._reservaService.buscarReservas(termino)
      .subscribe(reservas => this.reservas = reservas);
  }
  borrarReserva(reserva: Reserva) {
    this._reservaService.borrarReserva(reserva._id)
      .subscribe(()=> this.cargarReservas());
  }
}
