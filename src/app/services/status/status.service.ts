import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
   private apiUrl = 'http://194.163.44.12:3010/api/status'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  obtenerStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearStatus(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  actualizarStatus(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  eliminarStatus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
