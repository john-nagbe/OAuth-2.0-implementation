// In here, we will tell angular to run the "initializeApp()" method in "auth_google.service" before the rest of the application starts
import { ApplicationConfig, provideZoneChangeDetection, } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideOAuthClient } from 'angular-oauth2-oidc';
// Add 'withFetch' to this line here:
import { provideHttpClient, withFetch } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    // Update this line:
    provideHttpClient(withFetch()),
    provideOAuthClient(),
    provideAnimationsAsync(),
  ],
};
