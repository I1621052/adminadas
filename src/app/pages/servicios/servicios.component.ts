import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { Servicio } from '../../models/servicio.model';
declare var swal: any;

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: []
})
export class ServiciosComponent implements OnInit {
servicios: Servicio[]=[];
  constructor(
    public _servicioService: ServicioService
  ) { }

  ngOnInit() {
    this.cargarServicios();
  }

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  cargarServicios() {
    this._servicioService.cargarServicios()
      .subscribe(servicios => this.servicios = servicios);
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  buscarServicio(termino: string) {
    if (termino.length <= 0) {
      this.cargarServicios();
      return;
    }
    this._servicioService.buscarServicio(termino)
      .subscribe(servicios => this.servicios = servicios);

  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  guardarServicio(servicio: Servicio) {
    this._servicioService.actualizarServicio(servicio)
      .subscribe();
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  borrarServicio(servicio: Servicio) {
    this._servicioService.borrarServicio(servicio._id)
      .subscribe(() => this.cargarServicios());
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  crearServicio() {
    swal({
      title: 'Agregar categoria',
      text: 'Igrese nombre de categoria',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor) {
        return;
      }
      this._servicioService.crearServicio(valor)
      .subscribe(()=>this.cargarServicios());
    });
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

}
