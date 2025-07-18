import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGoogleService } from "../Service/auth-google.service";

const MODULES = [CommonModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './dashboard.Component.html',
  styleUrls: ['./dashboard.component.css'],

})

export class DashboardComponent {
  private authService = inject(AuthGoogleService);
  private router = inject(Router);
  profile = this.authService.profile;

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
