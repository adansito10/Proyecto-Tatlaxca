import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:3010/api/employees'; 

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmpleadoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearEmpleado(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

editarEmpleado(id: number, employee: any, user: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, { employee, user });
}

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
