import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  id: number;
  rol: string;
  descripcion: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

@Injectable({
  providedIn: 'root'
})


export class RolesService {
  private apiUrl = 'http://194.163.44.12:3010/api/roles';

  constructor(private http: HttpClient) {}

getRoles(): Observable<Role[]> {
  return this.http.get<Role[]>(this.apiUrl);
}

crearRol(rol: Partial<Role>): Observable<Role> {
  return this.http.post<Role>(this.apiUrl, rol);
}

actualizarRol(id: number, rol: Partial<Role>): Observable<Role> {
  return this.http.put<Role>(`${this.apiUrl}/${id}`, rol);
}

eliminarRol(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}