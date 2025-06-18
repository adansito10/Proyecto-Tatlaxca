import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map(isAuth => {
        console.log('AuthGuard - isAuth:', isAuth);
        if (!isAuth) {
          console.log('AuthGuard - No autenticado, redirigiendo a /auth/login');
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }

  canMatch(): Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(): Observable<boolean> {
    return this.checkAuthStatus();
  }
}
