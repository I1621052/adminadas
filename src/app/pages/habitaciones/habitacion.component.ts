import { Component, OnInit } from '@angular/core';
import { HabitacionService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from '../../services/service.index';
import { Habitacion } from '../../models/habitacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styles: []
})
export class HabitacionComponent implements OnInit {
  categorias: Categoria[] = [];
  habitacion: Habitacion = new Habitacion('', null, '');
  categoria: Categoria = new Categoria('');
  constructor(
    public _habitacionService: HabitacionService,
    public _CategoriaService: CategoriaService,
    public router: Router
  ) { }

  ngOnInit() {
    this._CategoriaService.cargarCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  guardarHabitacion(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._habitacionService.guardarHabitacion(this.habitacion)
      .subscribe(habitacion => {
        //console.log(habitacion);

      });
  }

  cambioCategoria(id: string) {
    this._CategoriaService.obtenerCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }

}
