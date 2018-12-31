import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../../models/habitacion.model';
import { HabitacionService } from '../../services/habitacion/habitacion.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styles: []
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  
  totalRegistros: number = 0;
  desde: number = 0;
  constructor(
    public _habitacionService: HabitacionService
  ) { }

  ngOnInit() {
    this.cargarHabitacion();
  }
  //====================================================================
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this._habitacionService.totalHabitaciones) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHabitacion();

  }
  //====================================================================

  //====================================================================
  cargarHabitacion() {
    this._habitacionService.cargarHabitaciones(this.desde)
      .subscribe(habitaciones => this.habitaciones = habitaciones);
  }
  //====================================================================

  //====================================================================
  buscarHabitacion(termino: string) {
    if (termino.length <= 0) {
      this.cargarHabitacion();
      return;
    }
    this._habitacionService.buscarHabitacion(termino)
      .subscribe(habitaciones => this.habitaciones = habitaciones);
  }
  //====================================================================

  //====================================================================
  borrarHabitacion(habitacion: Habitacion) {
    this._habitacionService.borrarHabitacion(habitacion._id)
      .subscribe(() => this.cargarHabitacion());
  }
  //====================================================================

}
