import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { authConfig } from "./auth.config";


@Injectable( {
  providedIn: 'root',
})
  export class AuthGoogleService{

private oAuthService = inject(OAuthService);
private router = inject(Router);
profile = signal<any>(null);

constructor() {
  this.initConfiguration();
}

initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      // if (this.oAuthService.hasValidIdToken()) {
      //   this.profile.set(this.oAuthService.getIdentityClaims());
      // }
    });

  }

login() {
  // This will initiate the OAuth 2.0 / OIDC login flow
  // The user will be redirected to the identity provider (Google in this case) for authentication
  this.oAuthService.initImplicitFlow();
}

logout() {
  // Revoke tokens on the server and clear local session
  this.oAuthService.revokeTokenAndLogout();
  //this.OAuthService.logout(); This redundant if the revokedTokenAndLogout is used
  //this.profile.set(null);
  this.oAuthService.logOut();

  //Redirect to the login page or home page after logout
  // '/login' is often appropriately used if you have a dedicated login route
  this.router.navigate(['/login']);
  console.log('User logged out.');

}
getProfile() {
  const profile = this.oAuthService.getIdentityClaims();
  return profile;
}

getToken() {
  return this.oAuthService.getAccessToken();
}
  }

