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
  diasDelMes: number[] = [];
  ventasDelDia: any[] = [];

  empleados: any[] = [];
  mesas: any[] = [];

  mesSeleccionado: string = '';
  diaSeleccionado: number = 1;
  totalMostrado: number = 0;

  paginaDias = 1;
  diasPorPagina = 7;
  totalPaginasDias = 1;

  constructor(
    private salesService: SalesService,
    private ordersService: OrdersService,
    private orderDetailsService: OrderDetailsService,
    private tablesService: TablesService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.salesService.getAllSales().subscribe(data => {
      this.ventasOriginal = data;
    });

    this.tablesService.obtenerMesas().subscribe(m => this.mesas = m);
    this.employeesService.getEmpleados().subscribe(e => this.empleados = e);
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

 async descargarExcel() {
  const data: any[] = [];

  for (const venta of this.ventasDelDia) {
    let productosTexto = 'Sin productos';
    let meseroNombre = 'Desconocido';
    let numeroMesa = 'N/D';
    let tipoCliente = '';
    let metodoPago = venta.metodo_pago || '';
    const totalPagado = venta.total_pagado;

    try {
      const orden = await this.ordersService.getOrderById(venta.id_orden).toPromise();

      if (orden) {
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

    data.push({
      ID_Venta: venta.id,
      ID_Orden: venta.id_orden,
      Método_Pago: metodoPago,
      Fecha_Pago: venta.fecha_pago,
      Productos: productosTexto,
      Mesero: meseroNombre,
      Mesa: numeroMesa,
      Tipo_Cliente: tipoCliente,
      Total_Pagado: totalPagado
    });
  }
const ws = XLSX.utils.json_to_sheet(data, { header: [
  'ID_Venta',
  'ID_Orden',
  'Método_Pago',
  'Fecha_Pago',
  'Productos',
  'Mesero',
  'Mesa',
  'Tipo_Cliente',
  'Total_Pagado'
] });

ws['!cols'] = [
  { wpx: 60 },   
  { wpx: 60 },   
  { wpx: 100 },  
  { wpx: 120 }, 
  { wpx: 350 },  
  { wpx: 120 },  
  { wpx: 50 },   
  { wpx: 100 },  
  { wpx: 80 }    
];

for (let i = 1; i <= data.length; i++) { 
  const cellRef = `I${i + 1}`; 
  if (ws[cellRef]) {
    ws[cellRef].z = '$#,##0.00';  
  }
}

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Reporte_Ventas');
XLSX.writeFile(wb, `reporte_ventas_${this.mesSeleccionado}_${this.diaSeleccionado}.xlsx`);
 }
}