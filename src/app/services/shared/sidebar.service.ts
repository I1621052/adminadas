import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [{
    titulo: 'principal',
    icono: 'mdi mdi-gauge',
    submenu:[
      { titulo: 'dashboard', url: '/dashboard' },
      { titulo: 'ProgressBar', url: '/progress' },
      { titulo: 'Graficas', url: '/graficas1' }
    ]
  }];
  constructor() { }
}
