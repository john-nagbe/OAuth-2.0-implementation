import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, catchError, throwError } from "rxjs"; // Added catchError and throwError

@Injectable({providedIn: 'root'})
export class AuthGoogleService {
  private router = inject(Router);
  private http = inject(HttpClient);

  profile = signal<any>(null);
  errorMessage = signal<string | null>(null); // New error signal

  fetchProfile(): Observable<any> {
    this.errorMessage.set(null); // Clear previous errors
    return this.http.get('http://localhost:8080/api/profile', {
      withCredentials: true
    }).pipe(
      tap(data => {
        console.log("Profile data received:", data);
        this.profile.set(data);
      }),
      catchError(err => {
        console.error("Profile fetch failed:", err);
        this.errorMessage.set("Session expired or server unreachable. Please login again.");
        return throwError(() => err);
      })
    );
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  logout() {
    window.location.href = 'http://localhost:8080/logout';
    //this.profile.set(null);
  }
}
