import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { HabitacionComponent } from './habitaciones/habitacion.component';



const PAGESROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'accout-settings', component: AccoutSettingsComponent, data: { titulo: 'Temas' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil' } },
            //mantenimientos
            { path: 'habitaciones', component: HabitacionesComponent, data: { titulo: 'Mantenimineto de Habitaciones' } },
            { path: 'habitacion/:id', component: HabitacionComponent, data: { titulo: 'Actualizar habitacion' } },
            { path: 'categorias', component: CategoriasComponent, data: { titulo: 'Mantenimineto de Categorias' } },
            { path: 'servicios', component: ServiciosComponent, data: { titulo: 'Mantenimineto de Servicios' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);