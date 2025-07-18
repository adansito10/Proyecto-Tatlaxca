// public.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap(isAuth => {
        if (isAuth) {
          console.log('👤 Ya autenticado. Redirigiendo a /dashboard/inicio');
          this.router.navigate(['/dashboard/inicio']);
        }
      }),
      map(isAuth => !isAuth) 
    );
  }
}
