import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Categoria } from '../../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  totalCategorias: number = 0;
  categoria: Categoria;
  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService
  ) { }
  //===========================================CARGAR CATEGORIAS
  cargarCategorias() {
    let url = URL_SERVICIOS + '/categoria';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalCategorias = resp.total;
        return resp.categorias;
      }));
  }

  //===========================================OBTENER CATEGORIA
  obtenerCategoria(id: string) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.categoria));
  }

  //===========================================BORRAR CATEGORIA

  borrarCategoria(id: string) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.delete(url)
      .pipe(map(resp => swal('Categoria borrada', 'Eliminado correctamente', 'success')));
  }

  //===========================================CREAR CATEGORIA
  crearCategorias(nombre: string) {
    let url = URL_SERVICIOS + '/categoria';
    url += '?token=' + this._usuarioServices.token;
    return this.http.post(url, {nombre} ).
      pipe(map((resp: any) => resp.categoria))
  }

  //===========================================BUSCAR CATEGORIA
  buscarCategoria(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/categorias/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.categorias));
  }

  //===========================================ACTUALIZAR CATEGORIA
  actualizarCategoria(categoria: Categoria) {
    let url = URL_SERVICIOS + '/categoria/' + categoria._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, categoria)
    .pipe(map((resp:any)=> {
      swal('Categoria actualizado', categoria.nombre,'success');
      return resp.categoria
    }));
  }
}
