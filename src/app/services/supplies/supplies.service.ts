import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  private apiUrl = `${environment.apiUrl}/supplies`; 

  constructor(private http: HttpClient) {}

  obtenerInsumos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearInsumo(insumo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, insumo);
  }

  actualizarInsumo(id: string, insumo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, insumo);
  }

  eliminarInsumo(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      stock: -1,
      deletedAt: new Date().toISOString() 
    });
 }
}
