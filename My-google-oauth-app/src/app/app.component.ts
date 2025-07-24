import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthGoogleService } from './Service/auth-google.service';
//import { LoginComponent } from './Login/login.component';
//import { DashboardComponent } from './Dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

const MODULES = [
  CommonModule,
  RouterOutlet,
  //LoginComponent,
  //DashboardComponent,
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private authService = inject(AuthGoogleService);

  singInWithGoogle() {
    this.authService.login()
  }
}
