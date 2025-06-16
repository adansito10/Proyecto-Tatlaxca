import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
  private apiUrl = `${environment.apiUrl}/ingredients`; // Asegúrate de que /ingredientes sea tu endpoint

  constructor(private http: HttpClient) {}

  obtenerIngredientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearIngrediente(ingrediente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ingrediente);
  }

  actualizarIngrediente(id: string, ingrediente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ingrediente);
  }

 eliminarIngrediente(id: number): Observable<any> {
    // URL correcta: http://localhost:3010/api/ingredients/7
    return this.http.put(`${this.apiUrl}/${id}`, {
      stock: -1,
      deletedAt: new Date().toISOString() 
    });
 }
}
