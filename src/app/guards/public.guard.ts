import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map(isAuth => {
        console.log('PublicGuard - isAuth:', isAuth);
        if (isAuth) {
          console.log('PublicGuard - Usuario ya autenticado, redirigiendo a /dashboard/inicio');
          this.router.navigate(['/dashboard/inicio']);
          return false;
        }
        return true;
      })
    );
  }
}
