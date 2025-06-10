import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  standalone: false,
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  mesSeleccionado: string = 'Mayo 2025';
  tipoReporteSeleccionado: string = 'ventasDiarias';

  meses: string[] = [
    'Enero 2025', 'Febrero 2025', 'Marzo 2025',
    'Abril 2025', 'Mayo 2025', 'Junio 2025'
  ];

  // Reporte 1: Ventas diarias
  ventasDiarias = [
    {
      fecha: '12/05/2025',
      numeroOrden: '00123',
      mesa: '#3',
      totalPagado: 120.00,
      metodoPago: 'Efectivo',
      mesero: 'Adan M',
      hora: '01:52 p.m'
    },
    {
      fecha: '14/05/2025',
      numeroOrden: '00154',
      mesa: '#1',
      totalPagado: 150.00,
      metodoPago: 'Transferencia',
      mesero: 'Angel Y',
      hora: '04:33 p.m'
    },
    {
      fecha: '15/05/2025',
      numeroOrden: '00165',
      mesa: '#4',
      totalPagado: 544.00,
      metodoPago: 'Tarjeta',
      mesero: 'Adan M',
      hora: '11:22 a.m'
    },
    {
      fecha: '16/05/2025',
      numeroOrden: '00166',
      mesa: '#2',
      totalPagado: 110.00,
      metodoPago: 'Efectivo',
      mesero: 'Casar G',
      hora: '06:35 p.m'
    },
    {
      fecha: '17/05/2025',
      numeroOrden: '00177',
      mesa: '#6',
      totalPagado: 56.00,
      metodoPago: 'Efectivo',
      mesero: 'Adan M',
      hora: '05:50 p.m'
    },
    {
      fecha: '18/05/2025',
      numeroOrden: '00184',
      mesa: '#1',
      totalPagado: 250.00,
      metodoPago: 'Transferencia',
      mesero: 'Angel Y',
      hora: '04:29 p.m'
    }
  ];

  // Reporte 2: Comidas más vendidas
  comidasMasVendidas = [
    { nombre: 'Hamburguesa', cantidad: 120 },
    { nombre: 'Pizza', cantidad: 95 },
    { nombre: 'Tacos', cantidad: 80 }
  ];

  // Reporte 3: Ventas por mesero
  ventasMeseros = [
    { mesero: 'Adan M', ventas: 3, total: 726.00 },
    { mesero: 'Angel Y', ventas: 2, total: 400.00 },
    { mesero: 'Casar G', ventas: 1, total: 110.00 }
  ];

  descargarReporte() {
    console.log('Descargando reporte del mes:', this.mesSeleccionado);
    console.log('Tipo de reporte:', this.tipoReporteSeleccionado);
    // Aquí puedes implementar lógica para exportar según tipo seleccionado
  }
}
