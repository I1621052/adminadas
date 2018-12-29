import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  constructor(
    public _categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  cargarCategorias() {
    this._categoriaService.cargarCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  buscarCategoria(termino: string) {
    if (termino.length <= 0) {
      this.cargarCategorias();
      return;
    }
    this._categoriaService.buscarCategoria(termino)
      .subscribe(categorias => this.categorias = categorias);

  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  guardarCategoria(categoria: Categoria) {
    this._categoriaService.actualizarCategoria(categoria)
      .subscribe();
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  borrarCategoria(categoria: Categoria) {
    this._categoriaService.borrarCategoria(categoria._id)
      .subscribe(() => this.cargarCategorias());
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  crearCategoria() {
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
      this._categoriaService.crearCategorias(valor)
      .subscribe(()=>this.cargarCategorias());
    });
  }
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
}
