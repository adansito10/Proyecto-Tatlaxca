import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TablesService {
   private apiUrl = 'http://194.163.44.12:3010/api/tables'; 

  constructor(private http: HttpClient) {}

  obtenerMesas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearMesa(mesa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mesa);
  }

  actualizarMesa(id: number, mesa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mesa);
  }

  eliminarMesa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}