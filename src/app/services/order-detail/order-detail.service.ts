import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'http://194.163.44.12:3010/api/order-details';

  constructor(private http: HttpClient) {}

  getByOrderId(idOrden: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idOrden}`);
  }
}
