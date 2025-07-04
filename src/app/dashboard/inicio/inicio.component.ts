

import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  // Tipos de gráficas
  public barChartType: ChartType = 'bar';
  public doughnutChartType: ChartType = 'doughnut';
  public lineChartType: ChartType = 'line';
  public polarChartType: ChartType = 'polarArea';

  // Datos de ejemplo para gráficas
  public dailySalesData: ChartData<'bar'> = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Ventas ($)',
      data: [320, 450, 370, 600, 800, 720, 500],
      backgroundColor: 'rgba(46, 204, 113, 0.7)'
    }]
  };

  public categoriesData: ChartData<'doughnut'> = {
    labels: ['Cafés', 'Bebidas', 'Comida', 'Postres'],
    datasets: [{
      data: [35, 25, 20, 15],
      backgroundColor: [
        'rgba(155, 89, 182, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)'
      ]
    }]
  };

  public monthlyTrendsData: ChartData<'line'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ventas ($)',
      data: [1500, 2000, 1800, 2200, 2500, 2300],
      fill: true,
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      borderColor: 'rgba(52, 152, 219, 1)',
      tension: 0.4
    }]
  };

  public paymentMethodsData: ChartData<'polarArea'> = {
    labels: ['Efectivo', 'Tarjeta', 'Transferencia'],
    datasets: [{
      data: [45, 30, 5],
      backgroundColor: [
        'rgba(46, 204, 113, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ]
    }]
  };

  // Opciones para gráficas
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { 
        backgroundColor: 'rgba(0,0,0,0.8)',
        bodyFont: { size: 14 },
        titleFont: { size: 16 }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'right',
        labels: { font: { size: 12 } }
      }
    },
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  };

  public polarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' }
    }
  };

  // Datos de ejemplo para productos
  topProducts = [
    {
      id: 1,
      nombre: 'Café Especial de la Casa',
      precio: 35.00,
      id_categoria: 1,
      imagen_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: 2,
      nombre: 'Capuchino Vainilla',
      precio: 40.00,
      id_categoria: 1,
      imagen_url: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: 3,
      nombre: 'Sandwich de Pollo',
      precio: 55.00,
      id_categoria: 3,
      imagen_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: 4,
      nombre: 'Té Verde Matcha',
      precio: 30.00,
      id_categoria: 2,
      imagen_url: 'data:image/jpeg;base64,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'
    },
      {
      id: 5,
      nombre: 'Capuchino Vainilla',
      precio: 40.00,
      id_categoria: 1,
      imagen_url: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
    },
   
  ];

  // Datos de ejemplo para categorías
  categories = [
    { id: 1, nombre: 'Cafés' },
    { id: 2, nombre: 'Bebidas' },
    { id: 3, nombre: 'Comida' },
    { id: 4, nombre: 'Postres' }
  ];

  // Datos de ejemplo para órdenes recientes
  recentOrders = [
    {
      fecha: new Date('2023-05-15T10:30:00'),
      mesa: 'M1',
      total: 120.50,
      estado: 'completed'
    },
    {
      fecha: new Date('2023-05-15T11:15:00'),
      mesa: 'M3',
      total: 85.75,
      estado: 'completed'
    },
    {
      fecha: new Date('2023-05-14T09:45:00'),
      mesa: 'M2',
      total: 65.00,
      estado: 'completed'
    },
    {
      fecha: new Date('2023-05-14T14:20:00'),
      mesa: 'M5',
      total: 42.50,
      estado: 'cancelled'
    },
    {
      fecha: new Date('2023-05-13T12:30:00'),
      mesa: 'M4',
      total: 95.25,
      estado: 'completed'
    }
  ];

  // Columnas para la tabla de órdenes
  orderColumns = ['fecha', 'mesa', 'total', 'estado'];

  // Función de ejemplo para obtener nombre de categoría (sin lógica real)
  getCategoryName(categoryId: number): string {
    return this.categories.find(c => c.id === categoryId)?.nombre || 'Desconocido';
  }

  // Función de ejemplo para ventas de producto (sin lógica real)
  getProductSales(productId: number): number {
    return Math.floor(Math.random() * 50) + 10; // Número aleatorio para el diseño
  }
}











