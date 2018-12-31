import { Component, OnInit } from '@angular/core';
import { HabitacionService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from '../../services/service.index';
import { Habitacion } from '../../models/habitacion.model';
import { Router, ActivatedRoute } from '@angular/router';

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
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarHabitacion(id);
      }
    });
  }

  ngOnInit() {
    this._CategoriaService.cargarCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }
  cargarHabitacion(id: string) {
    this._habitacionService.cargarHabitacion(id)
      .subscribe(habitacion =>  
        {
        this.habitacion = habitacion;
        this.habitacion.categoria = habitacion.categoria._id;
        this.cambioCategoria(this.habitacion.categoria);
        }
      );
  }

  guardarHabitacion(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._habitacionService.guardarHabitacion(this.habitacion)
      .subscribe(habitacion => {
        this.habitacion._id = habitacion._id;
        this.router.navigate(['/habitacion', habitacion._id])
        //console.log(habitacion);

      });
  }

  cambioCategoria(id: string) {
    this._CategoriaService.obtenerCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }
}
