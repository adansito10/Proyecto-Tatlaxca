import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin@correo.com' && password === '123456') {
      if (this.isBrowser) {
        localStorage.setItem('token', 'token-fake');
      }
      return of(true);
    }
    return of(false);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  checkAuthentication(): Observable<boolean> {
    if (!this.isBrowser) {
      // No hay localStorage en servidor, asumir no autenticado
      return of(false);
    }
    const token = localStorage.getItem('token');
    return of(!!token);
  }
}
