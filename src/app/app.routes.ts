import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SeafarerListComponent } from './components/seafarer-list/seafarer-list';
import { SeafarerFormComponent } from './components/seafarer-form/seafarer-form';
import { AuthGuard } from './Core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'seafarers',
    component: SeafarerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seafarer-form',
    component: SeafarerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seafarer-form/:id',
    component: SeafarerFormComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '/login' }
];

