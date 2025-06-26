import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private apiUrl = `${environment.apiUrl}/ingredients`; 

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
    return this.http.put(`${this.apiUrl}/${id}`, {
      stock: -1,
      deletedAt: new Date().toISOString() 
    });
 }
}
