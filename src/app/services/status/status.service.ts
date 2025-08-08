import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Status {
  id?: number;
  estado: string;
  descripcion: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {
   private apiUrl = 'http://144.202.72.236:3010/api/status'; 

  constructor(private http: HttpClient) {}

  obtenerStatus(): Observable<Status[]> {
   return this.http.get<Status[]>(this.apiUrl);
  }

  crearStatus(data: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, data);
  }

  actualizarStatus(id: number, data: Status): Observable<Status> {
    return this.http.put<Status>(`${this.apiUrl}/${id}`, data);
  }

  eliminarStatus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}