import { CommonModule } from "@angular/common";
import { Component, inject, signal, effect } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGoogleService } from "../Service/auth-google.service";

const MODULES = [CommonModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MODULES],
  templateUrl: './dashboard.component.html',
  styleUrl: "./dashboard.component.css",

})

export class DashboardComponent {
  private authService = inject(AuthGoogleService);
  private router = inject(Router);


  activeTab = signal<'profile' | 'security'>('profile');
  profile = this.authService.profile;
  errorMessage = this.authService.errorMessage;


  setTab(tab: 'profile' | 'security') {
    this.activeTab.set(tab);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
