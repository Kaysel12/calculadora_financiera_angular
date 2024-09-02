import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'calculadora'
  },
  {
    path: "login",
    loadComponent: () => import("./modules/auth/login/login.component"),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "calculadora",
    loadComponent: () => import("./modules/form/calculadora/calculadora.component"),
    canActivate: [AuthGuard]
  }
];
