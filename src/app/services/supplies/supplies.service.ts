import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Insumo {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
  stock: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  es_desechable?: boolean;
}

export interface InsumoSeleccionado extends Insumo {
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
   private apiUrl = 'http://194.163.44.12:3010/api/supplies'; 

  constructor(private http: HttpClient) {}

  obtenerInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.apiUrl);
  }

  crearInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }

  actualizarInsumo(id: number, insumo: Insumo): Observable<Insumo> {
    return this.http.put<Insumo>(`${this.apiUrl}/${id}`, insumo);
  }

  eliminarInsumo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  activarInsumo(id: number): Observable<Insumo> {
  return this.http.put<Insumo>(`${this.apiUrl}/activate/${id}`, {});
}

}