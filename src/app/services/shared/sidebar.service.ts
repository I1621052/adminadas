import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [{
    titulo: 'principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      { titulo: 'Dashboard', url: '/dashboard' },
      { titulo: 'ProgressBar', url: '/progress' },
      { titulo: 'Graficas', url: '/graficas1' },
      { titulo: 'Promesas', url: '/promesas' },
      { titulo: 'rxjs', url: '/rxjs' },
      { titulo: 'reserva', url: '/reserva/nuevo'}
    ]
  },
  {
    titulo: 'Mantenimientos',
    icono: 'mdi mdi-folder-lock-open',
    submenu:
      [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Reservas', url: '/reservas'},
        {titulo: 'Habitaciones', url: '/habitaciones'},
        {titulo: 'Servicios', url: '/servicios'},
        {titulo: 'Categorias', url: '/categorias'}
      ]
  }
  ];
  constructor() { }
}
