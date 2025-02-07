import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', // Ruta raíz
    redirectTo: '/auth/login', // Redirige al login
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard], // Protege esta ruta con el guard
  },
  {
    path: '**', // Cualquier otra ruta no definida
    redirectTo: '/auth/login', // Redirige al login
  },
];