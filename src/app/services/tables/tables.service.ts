import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Table {
  id?: number;
  numero: number;
  ubicacion: string;
  estado: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}


@Injectable({ providedIn: 'root' })
export class TablesService {
   private apiUrl = 'http://194.163.44.12:3010/api/tables'; 

  constructor(private http: HttpClient) {}

 obtenerMesas(): Observable<Table[]> {
  return this.http.get<Table[]>(this.apiUrl);
}

crearMesa(mesa: Table): Observable<Table> {
  return this.http.post<Table>(this.apiUrl, mesa);
}

actualizarMesa(id: number, mesa: Table): Observable<Table> {
  return this.http.put<Table>(`${this.apiUrl}/${id}`, mesa);
}

eliminarMesa(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}