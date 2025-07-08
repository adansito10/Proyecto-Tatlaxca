// src/app/services/dashboard/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://194.163.44.12:3010/api';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sales`);
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu`);
  }

  getInsumos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/supplies`);
  }

  getIngredientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ingredients`);
  }

  getOrdenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  getDetalles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/detail-orders`);
  }

  getDashboardData(): Observable<{
    ventas: any[],
    productos: any[],
    insumos: any[],
    ingredientes: any[],
    ordenes: any[],
    detalles: any[]
  }> {
    return forkJoin({
      ventas: this.getVentas(),
      productos: this.getProductos(),
      insumos: this.getInsumos(),
      ingredientes: this.getIngredientes(),
      ordenes: this.getOrdenes(),
      detalles: this.getDetalles()
    });
  }
}
