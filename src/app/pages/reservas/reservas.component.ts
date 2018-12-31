import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: []
})
export class ReservasComponent implements OnInit {
reservas: Reserva[]=[];
  constructor() { }

  ngOnInit() {
  }
cargarReservas(){
  
}
}
