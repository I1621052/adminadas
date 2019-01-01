import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../../models/habitacion.model';
import { HabitacionService } from '../../services/habitacion/habitacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  desde: number = 0;
  totalRegitros: number = 0;
  constructor(
    public _habitacionService: HabitacionService
  ) { }

  ngOnInit() {
    this.cargarHabitacion();
  }
  cargarHabitacion() {
    this._habitacionService.cargarHabitaciones(this.desde)
      .subscribe(habitaciones => this.habitaciones = habitaciones);
  }
}
