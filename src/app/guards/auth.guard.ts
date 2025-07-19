// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlSegment,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService, private router: Router) {}

  private checkAdminAccess(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          console.warn('Acceso denegado: Solo personal authorizada');
          this.router.navigate(['/auth/login']);
        }
      }),
      map(isAdmin => isAdmin)
    );
  }

  canActivate(): Observable<boolean> {
    return this.checkAdminAccess();
  }

  canMatch(): Observable<boolean> {
    return this.checkAdminAccess();
  }
}
