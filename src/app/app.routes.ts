import { Routes } from '@angular/router';
import { Vehicles } from './pages/vehicles/vehicles';
import { Home } from './pages/home/home';
import { Register } from './pages/vehicles/register/register';
import { View } from './pages/vehicles/view/view';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'veiculos',
    children: [
      {
        path: '',
        component: Vehicles,
      },
      {
        path: 'cadastrar',
        component: Register,
      },
      {
        path: ':id',
        component: View,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
