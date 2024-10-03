import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    // Clone the request and set the Authorization header if the token exists
    const cloned = authToken ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }) : req;

    // Handle the request and catch errors
    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        // If the error status is 401 (Unauthorized), clear the auth token and redirect to login
        if (error.status === 401) {
          this.authService.clearToken(); // Clear the token
          this.router.navigate(['/login']); // Redirect to the login page
        }
        // Pass the error along so that other parts of the application can handle it if needed
        return throwError(() => error);
      })
    );
  }
}
