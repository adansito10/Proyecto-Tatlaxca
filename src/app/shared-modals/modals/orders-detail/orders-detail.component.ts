import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetailsService } from '../../../services/order-detail/order-detail.service';

@Component({
  selector: 'app-ver-prders',
  standalone: false,
  templateUrl: './Orders-detail.component.html',
  styleUrls: ['./Orders-detail.component.scss']

})
export class OrderDetailComponent implements OnInit {
    detalles: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { idOrden: number },
    private orderDetailsService: OrderDetailsService
  ) {}

  ngOnInit(): void {
    this.orderDetailsService.getByOrderId(this.data.idOrden).subscribe({
      next: (data) => {
        this.detalles = data;
      },
      error: (err) => {
        console.error('Error al obtener los detalles de la orden', err);
      }
    });
  }
}