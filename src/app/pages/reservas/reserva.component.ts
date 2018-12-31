import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habitacion } from '../../models/habitacion.model';
import { ReservaService } from '../../services/reserva/reserva.service';
import { HabitacionService } from '../../services/service.index';
import { ServicioService } from '../../services/service.index';
import { Servicio } from '../../models/servicio.model';
import { Reserva } from '../../models/reserva.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styles: []
})
export class ReservaComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  servicios: Servicio[] = [];
  reserva: Reserva = new Reserva('','','',null,null,null,null,'','','');
  habitacion : Habitacion = new Habitacion('');
  servicio: Servicio = new Servicio('');

  constructor(
    public _reservaService: ReservaService,
    public _habitacionService: HabitacionService,
    public _servicioService: ServicioService,
    public roter: Router,
    public activatedRoter: ActivatedRoute
  ) { 
    activatedRoter.params.subscribe(params=>{
      let id= params['id'];
      if(id !== 'nuevo'){
        this.cargarReserva(id);
      }
    });
  }

  ngOnInit() {
    this._habitacionService.cargarHabitaciones()
      .subscribe(habitaciones => this.habitaciones = habitaciones);
    this._servicioService.cargarServicios()
      .subscribe(servicios => this.servicios = servicios);
  }
  cargarReserva(id:string){
    this._reservaService.cargarReserva(id)
    .subscribe(reserva=>this.reserva = reserva);
  }

  guardarReserva(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._reservaService.guardarReserva(this.reserva)
      .subscribe(reserva => {
        //console.log(reserva);
        this.reserva._id = reserva._id;
        this.roter.navigate(['reserva',reserva._id]);
      });
  }

  cambioHabitacion(id: string){
    this._habitacionService.cargarHabitacion(id)
    .subscribe(habitacion=> this.habitacion=habitacion);
  }

  cambioServicio(id:string){
  this._servicioService.obtenerServicio(id)
  .subscribe(servicio=>this.servicio = servicio);
  }
}
