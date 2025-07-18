import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"; // this is often used with MatFormField
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AuthGoogleService } from "../Service/auth-google.service";
import { CommonModule } from "@angular/common"; // needed for common directives like ngIf, ngFor

// Let's centralize the modules for cleaner imports
const ANGULAR_COMMON_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
];

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  //FormsModule,
  //ReactiveFormsModule,
  MatInputModule,

];

@Component({
  selector: 'app-login',
  standalone: true,
  // Let's use the spread operator to correctly flatten the arrays into the imports array
  imports: [...ANGULAR_COMMON_MODULES, ...ANGULAR_MATERIAL_MODULES],
  templateUrl: './login.Component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent {
  private authService = inject(AuthGoogleService);
  signInWithGoogle() {
    this.authService.login();
  }

  // For displaying the user info if already logged in on this page
  get userProfile() {
    return this.authService.getProfile();
  }

  // Logout button handler
  signOut() {
    this.authService.logout()
  }
}
