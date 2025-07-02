import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://194.163.44.12:3010/api/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
crearRol(rol: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rol);
  }

  actualizarRol(id: number, rol: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, rol);
  }

  eliminarRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}