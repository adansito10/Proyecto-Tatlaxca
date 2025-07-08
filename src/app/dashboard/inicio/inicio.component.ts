import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  ventas: any[] = [];
  productos: any[] = [];
  insumos: any[] = [];
  ingredientes: any[] = [];
  ordenes: any[] = [];
  detalles: any[] = [];

  topProductos: any[] = [];
  categoriasMasVendidas: any[] = [];
  ventasPorDia: any[] = [];
  ventasPorMesero: any[] = [];
  horasPico: any[] = [];
  productosConStockBajo: any[] = [];

  public ventasDiaData: ChartData<'line'> = { labels: [], datasets: [] };
  public ventasHoraData: ChartData<'bar'> = { labels: [], datasets: [] };
  public ventasMeseroData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public categoriasData: ChartData<'pie'> = { labels: [], datasets: [] };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.ventas = data.ventas;
      this.productos = data.productos;
      this.insumos = data.insumos;
      this.ingredientes = data.ingredientes;
      this.ordenes = data.ordenes;
      this.detalles = data.detalles;

      this.procesarDatos();
    });
  }

  procesarDatos() {
    this.procesarTopProductos();
    this.procesarCategorias();
    this.procesarVentasPorDia();
    this.procesarVentasPorMesero();
    this.procesarHorasPico();
    this.verificarStockBajo();
    this.configurarGraficas();
  }

  procesarTopProductos() {
    const conteo: { [id: number]: number } = {};
    for (const d of this.detalles) {
      conteo[d.id_menu] = (conteo[d.id_menu] || 0) + d.cantidad;
    }
    this.topProductos = this.productos
      .map(p => ({ ...p, ventas: conteo[p.id] || 0 }))
      .sort((a, b) => b.ventas - a.ventas)
      .slice(0, 5);
  }

  procesarCategorias() {
    const conteo: { [cat: string]: number } = {};
    for (const d of this.detalles) {
      const producto = this.productos.find(p => p.id === d.id_menu);
      const categoria = producto?.categoria || 'Desconocido';
      conteo[categoria] = (conteo[categoria] || 0) + d.cantidad;
    }
    this.categoriasMasVendidas = Object.entries(conteo)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }

procesarVentasPorDia() {
  const diasSemana = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  const conteo: { [dia: string]: number } = {};
  for (const v of this.ventas) {
    const fecha = new Date(v.fecha_pago);
    const diaIndex = fecha.getUTCDay();  // obtiene día de la semana en UTC (0 = dom)
    const dia = diasSemana[diaIndex];
    const total = parseFloat(v.total_pagado) || 0;
    conteo[dia] = (conteo[dia] || 0) + total;
  }
  this.ventasPorDia = Object.entries(conteo)
    .map(([dia, total]) => ({ dia, total }))
    .sort((a, b) => this.ordenDiasSemana(a.dia) - this.ordenDiasSemana(b.dia));
}

  ordenDiasSemana(dia: string): number {
    const orden = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
    return orden.indexOf(dia);
  }

  procesarVentasPorMesero() {
    const conteo: { [mesero: string]: number } = {};
    for (const o of this.ordenes) {
      const mesero = o.waiter_name || 'Sin asignar';
      const total = parseFloat(o.total) || 0;
      conteo[mesero] = (conteo[mesero] || 0) + total;
    }
    this.ventasPorMesero = Object.entries(conteo)
      .map(([mesero, total]) => ({ mesero, total }))
      .sort((a, b) => b.total - a.total);
  }

procesarHorasPico() {
  const conteo: { [hora: string]: number } = {};
  for (const v of this.ventas) {
    const fecha = new Date(v.created_at);
    const hora = fecha.getUTCHours().toString().padStart(2, '0') + ':00';
    conteo[hora] = (conteo[hora] || 0) + 1;
  }
  this.horasPico = Object.entries(conteo)
    .map(([hora, cantidad]) => ({ hora, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);
}


  verificarStockBajo() {
    this.productosConStockBajo = [...this.ingredientes, ...this.insumos].filter(i => i.stock < 5);
  }

  configurarGraficas() {
    this.ventasDiaData = {
      labels: this.ventasPorDia.map(d => d.dia),
      datasets: [{
        label: 'Ganancias ($)',
        data: this.ventasPorDia.map(d => d.total),
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4
      }]
    };

    this.ventasHoraData = {
      labels: this.horasPico.map(h => h.hora),
      datasets: [{
        label: 'Ventas por hora',
        data: this.horasPico.map(h => h.cantidad),
        backgroundColor: 'rgba(153,102,255,0.6)'
      }]
    };

    this.ventasMeseroData = {
      labels: this.ventasPorMesero.map(m => m.mesero),
      datasets: [{
        data: this.ventasPorMesero.map(m => m.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

    this.categoriasData = {
      labels: this.categoriasMasVendidas.map(c => c.nombre),
      datasets: [{
        data: this.categoriasMasVendidas.map(c => c.cantidad),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0']
      }]
    };
  }

  getColorPorStock(stock: number): string {
    if (stock < 2) return 'danger';
    if (stock < 5) return 'warning';
    return 'success';
  }
}
