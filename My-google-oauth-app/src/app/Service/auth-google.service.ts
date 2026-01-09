import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs"; // Ensure 'tap' is imported

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private router = inject(Router);
  private http = inject(HttpClient);
  profile = signal<any>(null);

  fetchProfile(): Observable<any> {
    return this.http.get('http://localhost:8080/api/profile', {
      withCredentials: true // Essential for sending the session cookie
    }).pipe(
      tap(data => {
        console.log("Profile data received:", data);
        this.profile.set(data); // This updates the signal so the Dashboard sees it
      })
    );
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  logout() {
    window.location.href = 'http://localhost:8080/logout';
    this.profile.set(null);
  }
}
