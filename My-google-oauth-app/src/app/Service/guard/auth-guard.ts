import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service'
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthGoogleService);
  const router = inject(Router);

  console.log('Guard: Checking profile...');

  return authService.fetchProfile().pipe(
    map((profile) => {
      // Check if the response is actually a user or just an error message
      if (!profile || profile.error) {
        console.error('Guard: No valid session found', profile);
        router.navigate(['/login']);
        return false;
      }

      console.log('Guard: Valid Profile Found', profile);
      // We don't need authService.profile.set(profile) here
      // because the Service's 'tap' already did it!
      return true;
    }),
    catchError((err) => {
      console.error('Guard: Network or Server Error', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
