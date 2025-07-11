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
  ordenes: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog  
  ) {}

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe({
      next: data => {
        this.ordenes = data;
      },
      error: err => {
        console.error('Error al obtener las órdenes', err);
      }
    });
  }



verProductos(idOrden: number) {
  console.log('this.dialog:', this.dialog);
  this.dialog.open(OrderDetailComponent, {
    width: '700px',
    data: { idOrden }
  });
}

}