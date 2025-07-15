import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales/sales.service';
import { OrdersService } from '../../services/orders/orders.service';
import { OrderDetailsService } from '../../services/order-detail/order-detail.service';
import { TablesService } from '../../services/tables/tables.service';
import { EmployeesService } from '../../services/employees/employees-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  ventasOriginal: any[] = [];
  ventasFiltradas: any[] = [];

  empleados: any[] = [];
  mesas: any[] = [];

  fechaFiltro: string = ''; 
  totalMostrado: number = 0;

  constructor(
    private salesService: SalesService,
    private ordersService: OrdersService,
    private orderDetailsService: OrderDetailsService,
    private tablesService: TablesService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.tablesService.obtenerMesas().subscribe(m => this.mesas = m);
    this.employeesService.getEmpleados().subscribe(e => this.empleados = e);

    this.salesService.getAllSales().subscribe(data => {
      this.ventasOriginal = data;
      this.fechaFiltro = this.obtenerFechaLocalISO();
      this.aplicarFiltroFecha();
    });
  }

  obtenerFechaLocalISO(): string {
    const ahora = new Date();
    const yyyy = ahora.getFullYear();
    const mm = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const dd = ahora.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  aplicarFiltroFecha() {
    if (!this.fechaFiltro) {
      this.ventasFiltradas = [...this.ventasOriginal];
    } else {
      this.ventasFiltradas = this.ventasOriginal.filter(v => {
        const fechaSolo = v.fecha_pago.split('T')[0];
        return fechaSolo === this.fechaFiltro;
      });
    }
    this.totalMostrado = this.ventasFiltradas.reduce((acc, v) => acc + Number(v.total_pagado), 0);
  }

  formatearFecha(fechaISO: string): string {
    if (!fechaISO) return '';
    const partes = fechaISO.split('T')[0].split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  async descargarExcel() {
    const data: any[] = [];

    for (const venta of this.ventasFiltradas) {
      let productosTexto = 'Sin productos';
      let meseroNombre = 'Desconocido';
      let numeroMesa = 'N/D';
      let tipoCliente = '';
      let metodoPago = venta.metodo_pago || '';
      const totalPagado = Number(venta.total_pagado);
      const fechaSolo = venta.fecha_pago.split('T')[0];
      let descuento = 0;
      let totalOrden = 0;

      try {
        const orden = await this.ordersService.getOrderById(venta.id_orden).toPromise();

        if (orden) {
          descuento = Number(orden.descuento || 0);
          totalOrden = Number(orden.total || 0);

          const mesero = this.empleados.find(e => e.id === orden.id_mesero);
          meseroNombre = mesero ? `${mesero.nombre} ${mesero.appaterno}` : 'Desconocido';

          const mesa = this.mesas.find(m => m.id === orden.id_mesa);
          numeroMesa = mesa ? mesa.numero : 'N/D';

          tipoCliente = orden.tipo_cliente || '';
        }

        const detalles = await this.orderDetailsService.getByOrderId(venta.id_orden).toPromise();

        if (detalles && detalles.length > 0) {
          productosTexto = detalles.map(p => {
            const nombre = p.nombre_producto || 'Producto';
            const precio = parseFloat(p.subtotal) || 0;
            return `${nombre} x${p.cantidad} ($${precio.toFixed(2)})`;
          }).join(', ');
        }
      } catch (error) {
        console.error(`Error al obtener datos de orden ${venta.id_orden}:`, error);
      }

      const descuentoTexto = (descuento > 0 && totalOrden > 0)
        ? `$${descuento.toFixed(2)} (${((descuento / totalOrden) * 100).toFixed(2)}%)`
        : `$0.00`;

      data.push({
        ID_Venta: venta.id,
        ID_Orden: venta.id_orden,
        Método_Pago: metodoPago,
        Fecha_Pago: fechaSolo,
        Productos: productosTexto,
        Mesero: meseroNombre,
        Mesa: numeroMesa,
        Tipo_Cliente: tipoCliente,
        Total: totalOrden,
        Descuento: descuentoTexto,
        Total_Pagado: totalPagado
      });
    }

    const sumaTotalPagado = data.reduce((sum, r) => sum + (r.Total_Pagado || 0), 0);

    data.push({});
    data.push({
      Tipo_Cliente: 'TOTALES:',
      Total_Pagado: sumaTotalPagado
    });

    const ws = XLSX.utils.json_to_sheet(data, {
      header: [
        'ID_Venta',
        'ID_Orden',
        'Método_Pago',
        'Fecha_Pago',
        'Productos',
        'Mesero',
        'Mesa',
        'Tipo_Cliente',
        'Total',
        'Descuento',
        'Total_Pagado'
      ]
    });

    ws['!cols'] = [
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 100 },
      { wpx: 120 },
      { wpx: 350 },
      { wpx: 120 },
      { wpx: 50 },
      { wpx: 100 },
      { wpx: 80 },
      { wpx: 120 },  
      { wpx: 80 }
    ];

    for (let i = 1; i <= data.length; i++) {
      const cellOrden = `I${i + 1}`;
      const cellTotal = `K${i + 1}`;
      if (ws[cellOrden]) ws[cellOrden].z = '$#,##0.00';
      if (ws[cellTotal]) ws[cellTotal].z = '$#,##0.00';
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte_Ventas');
    XLSX.writeFile(wb, `reporte_ventas_${this.fechaFiltro}.xlsx`);
  }
}
