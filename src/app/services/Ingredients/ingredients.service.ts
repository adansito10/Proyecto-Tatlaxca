import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingrediente {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
  stock: number;
  created_at?: string; 
  updated_at?: string;
  deleted_at?: string;
}
@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private apiUrl = 'http://144.202.72.236:3010/api/ingredients';

  constructor(private http: HttpClient) {}

  obtenerIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  crearIngrediente(ingrediente: Partial<Ingrediente>): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
  }

  actualizarIngrediente(id: number, ingrediente: Partial<Ingrediente>): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(`${this.apiUrl}/${id}`, ingrediente);
  }

  eliminarIngrediente(id: number): Observable<Ingrediente> {
    return this.http.delete<Ingrediente>(`${this.apiUrl}/${id}`);
  }

  activarIngrediente(id: number): Observable<Ingrediente> {
  return this.http.put<Ingrediente>(`${this.apiUrl}/activate/${id}`, {});
}

}
