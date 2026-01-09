import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service'
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthGoogleService);
  const router = inject(Router);

  console.log('Guard: Checking profile...'); // TEST 1

  return authService.fetchProfile().pipe(
    map((profile) => {
      console.log('Guard: Profile fetched successfully', profile); // TEST 2
      authService.profile.set(profile);
      return true;
    }),
    catchError((err) => {
      console.error('Guard: Error fetching profile', err); // TEST 3
      router.navigate(['/login']);
      return of(false);
    })
  );
};
