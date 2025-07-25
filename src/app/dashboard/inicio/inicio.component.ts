import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { AuthService } from '../../services/auth/auth.service';
import { EmployeesService } from '../../services/employees/employees-service';
import { ChartOptions } from 'chart.js';


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
  ordenesPorDia: { clave: string; cantidad: number }[] = [];
  nombreUsuario: string = '';
  ingredientesBajoStock: any[] = [];
  insumosBajoStock: any[] = [];

  public ventasDiaData: ChartData<'line'> = { labels: [], datasets: [] };
  public ventasSemanaData: ChartData<'line'> = { labels: [], datasets: [] };
  public ventasHoraData: ChartData<'bar'> = { labels: [], datasets: [] };
  public ventasMeseroData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public categoriasData: ChartData<'pie'> = { labels: [], datasets: [] };
  public ordenesDiaData: ChartData<'bar'> = { labels: [], datasets: [] };

  mesAnterior: number = new Date().getMonth();

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
    const mesActual = new Date().getMonth();

    if (this.mesAnterior !== mesActual) {
      this.topProductos = [];
      this.productosMenosVendidos = [];
      this.categoriasMasVendidas = [];
      this.ventasPorMesero = [];
      this.mesAnterior = mesActual;
    }

    this.procesarTopProductos();
    this.procesarProductosMenosVendidos();
    this.procesarCategorias();
    this.procesarVentasPorDia();
    this.procesarVentasPorSemana();
    this.procesarVentasPorMesero();
    this.procesarHorasPico();
    this.procesarOrdenesPorDia();
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
    const conteo: { [clave: string]: { total: number, fecha: Date } } = {};

    for (const v of this.ventas) {
      const partes = v.fecha_pago.slice(0, 10).split('-');
      const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));

      const diaNombre = diasSemana[fecha.getDay()];
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');

      const claveVisible = `${diaNombre} (${dia}/${mes})`;

      const total = parseFloat(v.total_pagado) || 0;

      if (conteo[claveVisible]) {
        conteo[claveVisible].total += total;
      } else {
        conteo[claveVisible] = { total, fecha };
      }
    }

    let ventasPorDia = Object.entries(conteo)
      .map(([clave, data]) => ({ clave, total: data.total, fecha: data.fecha }))
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 7);
    ventasPorDia = ventasPorDia.filter(v => v.fecha >= fechaLimite);

    this.ventasPorDia = ventasPorDia.map(({ clave, total }) => ({ clave, total }));
  }

  procesarVentasPorSemana() {
    const semanas: { [claveVisible: string]: { total: number, semana: number, año: number } } = {};

    for (const v of this.ventas) {
      const fecha = new Date(v.fecha_pago);
      const weekNumber = this.getNumeroSemana(fecha);
      const año = fecha.getFullYear();
      const claveInterna = `${weekNumber}-${año}`;

      if (!semanas[claveInterna]) {
        semanas[claveInterna] = { total: 0, semana: weekNumber, año };
      }

      const total = parseFloat(v.total_pagado) || 0;
      semanas[claveInterna].total += total;
    }

    let clavesOrdenadas = Object.entries(semanas)
      .sort(([, a], [, b]) => a.año !== b.año ? a.año - b.año : a.semana - b.semana);

    if (clavesOrdenadas.length > 5) {
      clavesOrdenadas = clavesOrdenadas.slice(-5);
    }

    this.ventasSemanaData = {
      labels: clavesOrdenadas.map(([, v]) => `Semana ${v.semana}`),
      datasets: [{
        label: 'Ganancias de la Semana',
        data: clavesOrdenadas.map(([, v]) => v.total),
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
      const hora = fecha.getHours().toString().padStart(2, '0') + ':00';

      conteo[hora] = (conteo[hora] || 0) + 1;
    }
    let horas = Object.entries(conteo)
      .map(([hora, cantidad]) => ({ hora, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);

    horas = horas.slice(0, 5);
    this.horasPico = horas;
  }

  procesarOrdenesPorDia() {
    const diasSemana = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const conteo: { [clave: string]: { cantidad: number; fecha: Date } } = {};

    for (const o of this.ordenes) {
      const fechaOrden = new Date(o.fecha_creacion || o.created_at || o.fecha || '');
      if (isNaN(fechaOrden.getTime())) continue;

      const diaNombre = diasSemana[fechaOrden.getDay()];
      const dia = fechaOrden.getDate().toString().padStart(2, '0');
      const mes = (fechaOrden.getMonth() + 1).toString().padStart(2, '0');

      const claveVisible = `${diaNombre} (${dia}/${mes})`;

      if (conteo[claveVisible]) {
        conteo[claveVisible].cantidad += 1;
      } else {
        conteo[claveVisible] = { cantidad: 1, fecha: fechaOrden };
      }
    }

    let ordenesPorDia = Object.entries(conteo)
      .map(([clave, data]) => ({ clave, cantidad: data.cantidad, fecha: data.fecha }))
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 7);
    ordenesPorDia = ordenesPorDia.filter(o => o.fecha >= fechaLimite);

    this.ordenesPorDia = ordenesPorDia.map(({ clave, cantidad }) => ({ clave, cantidad }));
  }

verificarStockBajo() {
  this.ingredientesBajoStock = this.ingredientes
    .filter(i => i.stock < 5 && i.deleted_at === null)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  this.insumosBajoStock = this.insumos
    .filter(i => i.stock < 5 && i.deleted_at === null)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);
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
        tension: 0.4,
        
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
backgroundColor: [
  '#FF6384',  
  '#36A2EB', 
  '#FFCE56',
  '#b53f88ff', 
  '#4BC0C0', 
  '#9966FF',  
  '#FF9F40',  
  '#8BC34A', 
  '#C2185B',  
  '#00BCD4', 
  '#F44336', 
  '#CDDC39', 
  '#3F51B5',  
  '#FFEB3B', 
  '#009688',
  '#E91E63',  
  '#795548', 
  '#9C27B0',  
  '#607D8B',  
  '#00E676'  
]
      }]
    };

    this.categoriasData = {
      labels: this.categoriasMasVendidas.map(c => c.nombre),
      datasets: [{
        data: this.categoriasMasVendidas.map(c => c.cantidad),
backgroundColor: [
  '#00ae06ff',  
  '#2196f3',    
  '#ff9800',    
  '#9027b0ff',  
  '#f44336',   
  '#00ffd9ff',  
  '#f7ff11ff', 
  '#e91e63',    
  '#ffc107',    
  '#3f51b5',    
  '#795548ff', 
  '#607d8bff',  
  '#8bc34aff',  
  '#ff5722ff',  
  '#673ab7ff',  
  '#cddc39ff', 
  '#009688ff',  
  '#d32f2fff',  
  '#00bcd4ff',  
  '#9e9e9eff'   
]


      }]
    };

    this.ordenesDiaData = {
      labels: this.ordenesPorDia.map(o => o.clave),
      datasets: [{
        label: 'Órdenes atendidas',
        data: this.ordenesPorDia.map(o => o.cantidad),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    };
  }


  public chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      labels: {
        color: 'white' 
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    },
    y: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    }
  }
};

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
