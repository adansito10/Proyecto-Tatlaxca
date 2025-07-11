import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
   private apiUrl = 'http://194.163.44.12:3010/api/supplies'; // Cambia la URL según tu configuración

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
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
 }
