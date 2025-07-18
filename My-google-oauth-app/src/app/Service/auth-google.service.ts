import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { authConfig } from "./oauth.config";


// Let's try to define a more  specific type for the user profile
interface UserProfile {
  given_name?: string;
  family_name?: string; //"family_name? = last name"
  picture?: string; // user profile picture
  email?: string;
}

@Injectable( {
  providedIn: 'root',
})
  export class AuthGoogleService{

private oauthService = inject(OAuthService);
private router = inject(Router);
//profile = signal<UserProfile | null>(null); //using a more specific type than "any"
// we will let TypeScript infer the type from the assignment
profile = signal<ReturnType<OAuthService['getIdentityClaims']> | null>(null);
constructor() {
  this.configureOAuth(); // Centralize configuration
}

private configureOAuth() {
  this.oauthService.configure(authConfig);
  this.oauthService.setupAutomaticSilentRefresh();

  // Load discovery document and try to login silently
  this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
    // Check if a valid ID token is present after login attempt or silent refresh
    if(this.oauthService.hasValidIdToken()) {
     this.profile.set(this.oauthService.getIdentityClaims() as UserProfile);
     console.log('User already logged in:', this.profile());
    }
}).catch(error => {
  // Handle errors during discovery document or silent login (e.g., CORS issues, network errors)
  console.error('Error loading discovery document or silent login:', error);
  // For now we will keep it this way. I might clear the local storage or redirect
  // this.logout();
})
}

login() {
  // This will initiate the OAuth 2.0 / OIDC login flow
  // The user will be redirected to the identity provider (Google in this case) for authentication
  this.oauthService.initLoginFlow();
}

logout() {
  // Revoke tokens on the server and clear local session
  this.oauthService.revokeTokenAndLogout();
  //this.OAuthService.logout(); This redundant if the revokedTokenAndLogout is used
  this.profile.set(null);

  //Redirect to the login page or home page after logout
  // '/login' is often appropriately used if you have a dedicated login route
  this.router.navigate(['/login']);
  console.log('User logged out.');

}
getProfile(): UserProfile | null {
  return this.profile();
}

// Checking if the user is logged in
isLoggedIn(): boolean {
  return this.oauthService.hasValidAccessToken() && !!this.profile();
}
  }

