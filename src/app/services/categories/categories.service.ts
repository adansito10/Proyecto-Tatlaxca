import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })

export class CategoriesService {
  private apiUrl = 'http://144.202.72.236:3010/api/categories';

  constructor(private http: HttpClient) {}

  obtenerCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  crearCategory(data: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, data);
  }

  actualizarCategory(id: number, data: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, data);
  }

  eliminarCategory(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.apiUrl}/${id}`);
  }
}
