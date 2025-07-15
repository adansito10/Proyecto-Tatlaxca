import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { OrderDetailComponent } from '../../shared-modals/modals/orders-detail/orders-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordenesOriginal: any[] = [];
  ordenes: any[] = [];
  filtroFecha: string = '';  

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog  
  ) {}

  ngOnInit(): void {
    this.filtroFecha = this.obtenerFechaHoy();

    this.ordersService.getAllOrders().subscribe({
      next: data => {
        this.ordenesOriginal = data;
        this.aplicarFiltros();  
      },
      error: err => {
        console.error('Error al obtener las órdenes', err);
      }
    });
  }

  obtenerFechaHoy(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const day = hoy.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  aplicarFiltros() {
    if (!this.filtroFecha) {
      this.ordenes = [];
      return;
    }

    this.ordenes = this.ordenesOriginal.filter(o => {
      const fechaOrden = new Date(o.fecha);
      const filtro = new Date(this.filtroFecha);

      return fechaOrden.getFullYear() === filtro.getFullYear() &&
             fechaOrden.getMonth() === filtro.getMonth() &&
             fechaOrden.getDate() === filtro.getDate();
    });
  }

  formatearFecha(fechaISO: string): string {
    if (!fechaISO) return '';
    const partes = fechaISO.substring(0, 10).split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  verProductos(idOrden: number) {
    this.dialog.open(OrderDetailComponent, {
      width: '700px',
      data: { idOrden }
    });
  }
}
