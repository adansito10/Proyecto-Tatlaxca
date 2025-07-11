import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://194.163.44.12:3010/api/menu';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  actualizarProducto(id: string, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto);
  }

eliminarProducto(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);

}

 obtenerCategorias(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/categories`);
}

obtenerProductoPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}/details`);
}


  
}
