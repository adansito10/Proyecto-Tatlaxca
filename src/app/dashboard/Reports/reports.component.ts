import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales/sales.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  ventasOriginal: any[] = [];
  diasDelMes: number[] = [];
  ventasDelDia: any[] = [];

  mesSeleccionado: string = ''; 
  diaSeleccionado: number = 1;
  totalMostrado: number = 0;

  paginaDias = 1;
  diasPorPagina = 7;
  totalPaginasDias = 1;

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.salesService.getAllSales().subscribe(data => {
      this.ventasOriginal = data;
    });
  }

  seleccionarMes(mes: string) {
    this.mesSeleccionado = mes;
    const [year, month] = mes.split('-').map(Number);
    const dias = new Date(year, month, 0).getDate();
    this.diasDelMes = Array.from({ length: dias }, (_, i) => i + 1);

    this.totalPaginasDias = Math.ceil(this.diasDelMes.length / this.diasPorPagina);
    this.paginaDias = 1;
    this.diaSeleccionado = 1;
    this.actualizarVentasDelDia();
  }

  get diasVisibles(): number[] {
    const start = (this.paginaDias - 1) * this.diasPorPagina;
    return this.diasDelMes.slice(start, start + this.diasPorPagina);
  }

  cambiarPaginaDias(direccion: number): void {
    this.paginaDias = Math.min(this.totalPaginasDias, Math.max(1, this.paginaDias + direccion));
  }

  seleccionarDia(dia: number) {
    this.diaSeleccionado = dia;
    this.actualizarVentasDelDia();
  }

  actualizarVentasDelDia() {
    const fechaFiltro = `${this.mesSeleccionado}-${this.diaSeleccionado.toString().padStart(2, '0')}`;
    this.ventasDelDia = this.ventasOriginal.filter(v => v.fecha_pago.startsWith(fechaFiltro));
    this.totalMostrado = this.ventasDelDia.reduce((acc, venta) => acc + Number(venta.total_pagado), 0);
  }

  descargarExcel() {
    const data = this.ventasDelDia.map(v => ({
      ID: v.id,
      Orden: v.id_orden,
      Método_Pago: v.metodo_pago,
      Fecha_Pago: v.fecha_pago,
      Total_Pagado: v.total_pagado
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    XLSX.writeFile(wb, `ventas_${this.mesSeleccionado}_${this.diaSeleccionado}.xlsx`);
  }
}
