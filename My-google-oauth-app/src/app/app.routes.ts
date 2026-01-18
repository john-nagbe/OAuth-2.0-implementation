import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { authGuard } from './Service/guard/auth-guard'; // 1. Import your guard

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard] // 2. ATTACH THE GUARD HERE
  },
  { path: '**', redirectTo: '/login' }
];
