import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://194.163.44.12:3010/api/users/login';

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, { correo: email, password }).pipe(
      map(response => {
        if (response && response.user && response.user.rol === 'Administrador') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user); 
          return true;
        }
        return false;
      })
    );
  }

checkAuthentication(): Observable<boolean> {
  const userData = localStorage.getItem('user');
  if (!userData) return of(false);

  try {
    const user = JSON.parse(userData);
    return of(user.rol?.toLowerCase() === 'administrador');
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
    return of(false);
  }
}


  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null); 
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUserObservable(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.rol === 'Administrador';
  }
}
