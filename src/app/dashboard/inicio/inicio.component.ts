import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { AuthService } from '../../services/auth.service/auth.service';
import { EmployeesService } from '../../services/employees/employees-service';

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
  productosMenosVendidos: any[] = [];
  categoriasMasVendidas: any[] = [];
  ventasPorDia: any[] = [];
  ventasPorMesero: any[] = [];
  horasPico: any[] = [];
  productosConStockBajo: any[] = [];
  mesActual: string = '';
  nombreUsuario: string = '';

  public ventasDiaData: ChartData<'line'> = { labels: [], datasets: [] };
  public ventasSemanaData: ChartData<'line'> = { labels: [], datasets: [] };
  public ventasHoraData: ChartData<'bar'> = { labels: [], datasets: [] };
  public ventasMeseroData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public categoriasData: ChartData<'pie'> = { labels: [], datasets: [] };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserObservable().subscribe(user => {
      if (user && user.correo) {
        this.employeesService.getEmpleados().subscribe({
          next: (empleados) => {
            const empleado = empleados.find(emp => emp.correo === user.correo);
            this.nombreUsuario = empleado ? empleado.nombre : '';
          },
          error: () => this.nombreUsuario = ''
        });
      } else {
        this.nombreUsuario = '';
      }
    });

    this.dashboardService.getDashboardData().subscribe(data => {
      this.ventas = data.ventas;
      this.productos = data.productos;
      this.insumos = data.insumos;
      this.ingredientes = data.ingredientes;
      this.ordenes = data.ordenes;
      this.detalles = data.detalles;

      this.mesActual = new Date().toLocaleDateString('es-MX', {
        month: 'long',
        year: 'numeric'
      });

      this.procesarDatos();
    });
  }

  procesarDatos() {
    this.procesarTopProductos();
    this.procesarProductosMenosVendidos();
    this.procesarCategorias();
    this.procesarVentasPorDia();
    this.procesarVentasPorSemana();
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

  procesarProductosMenosVendidos() {
    const conteo: { [id: number]: number } = {};
    for (const d of this.detalles) {
      conteo[d.id_menu] = (conteo[d.id_menu] || 0) + d.cantidad;
    }

    this.productosMenosVendidos = this.productos
      .map(p => ({ ...p, ventas: conteo[p.id] || 0 }))
      .sort((a, b) => a.ventas - b.ventas)
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
    const conteo: { [clave: string]: number } = {};
    const ahora = new Date();

    for (const v of this.ventas) {
      const fecha = new Date(v.fecha_pago);
      if (
        fecha.getMonth() === ahora.getMonth() &&
        fecha.getFullYear() === ahora.getFullYear()
      ) {
        const diaNombre = diasSemana[fecha.getDay()];
        const fechaTexto = fecha.toLocaleDateString('es-MX', {
          day: '2-digit',
          month: '2-digit'
        });
        const clave = `${diaNombre} (${fechaTexto})`;
        const total = parseFloat(v.total_pagado) || 0;
        conteo[clave] = (conteo[clave] || 0) + total;
      }
    }

    this.ventasPorDia = Object.entries(conteo)
      .map(([clave, total]) => ({ clave, total }))
      .sort((a, b) => {
        const matchA = a.clave.match(/\((\d{2}\/\d{2})\)/);
        const matchB = b.clave.match(/\((\d{2}\/\d{2})\)/);
        const fechaA = matchA ? new Date(`2024/${matchA[1]}`) : new Date();
        const fechaB = matchB ? new Date(`2024/${matchB[1]}`) : new Date();
        return fechaA.getTime() - fechaB.getTime();
      });
  }

  procesarVentasPorSemana() {
    const semanas: { [semana: string]: number } = {};
    const now = new Date();

    for (const v of this.ventas) {
      const fecha = new Date(v.fecha_pago);
      if (
        fecha.getMonth() === now.getMonth() &&
        fecha.getFullYear() === now.getFullYear()
      ) {
        const weekNumber = this.getNumeroSemana(fecha);
        const clave = `Semana ${weekNumber}`;
        const total = parseFloat(v.total_pagado) || 0;
        semanas[clave] = (semanas[clave] || 0) + total;
      }
    }

    const clavesOrdenadas = Object.keys(semanas).sort((a, b) =>
      parseInt(a.replace('Semana ', '')) - parseInt(b.replace('Semana ', ''))
    );

    this.ventasSemanaData = {
      labels: clavesOrdenadas,
      datasets: [{
        label: 'Ganancias Semanales',
        data: clavesOrdenadas.map(k => semanas[k]),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.3)',
        fill: true,
        tension: 0.3
      }]
    };
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
      labels: this.ventasPorDia.map(d => d.clave),
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

  getNumeroSemana(fecha: Date): number {
    const temp = new Date(fecha.getFullYear(), 0, 1);
    const diff = fecha.getTime() - temp.getTime();
    return Math.ceil(((diff / (1000 * 60 * 60 * 24)) + temp.getDay() + 1) / 7);
  }

  getColorPorStock(stock: number): string {
    if (stock < 2) return 'danger';
    if (stock < 5) return 'warning';
    return 'success';
  }
}
