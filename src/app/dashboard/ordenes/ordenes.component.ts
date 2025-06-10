import { Component } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  standalone: false,
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent {
  Ordenes = [
    {
      fecha: '12/05/2025',
      numeroOrden: '00123',
      hora:'01:52 p.m',
      mesa: '#3',
      productos: ['Pizza', 'Refresco', 'Postre'],
      total: '$150.00',
      mesero: 'Adan M',
      descripcion: 'Entregado',
    },
    {
      fecha: '13/05/2025',
      numeroOrden: '00124',
      hora:'01:52 p.m',
      mesa: '#5',
      productos: ['Hamburguesa', 'Papas Fritas'],
      total: '$120.00',
      mesero: 'Lucía G',
      descripcion: 'En preparación',
    }
  ];

  descargarReporte() {
    console.log('Descargando reporte del mes:');
  }
}
