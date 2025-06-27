import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}
@Injectable({ providedIn: 'root' })

export class CategoriesService {
 private apiUrl = `${environment.apiUrl}/categories`; 

  constructor(private http: HttpClient) {}

  obtenerCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  crearCategory(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, data);
  }

  actualizarCategory(id: number, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, data);
  }

  eliminarCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`);
  }
}
