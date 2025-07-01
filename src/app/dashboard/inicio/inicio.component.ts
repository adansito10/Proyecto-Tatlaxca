import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  public fechaActual: Date = new Date();
  public gananciasHoy: number = 1250.00;

  // 📊 Ventas semanales
  public ventasLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  public ventasData = [{
    data: [320, 450, 370, 600, 800, 720, 500],
    label: 'Ventas ($)',
    backgroundColor: '#4caf50'
  }];
  public ventasType: ChartType = 'bar';
  public ventasOptions: ChartOptions = { responsive: true };

  // 🥧 Categorías más vendidas
  public categoriasLabels = ['Café', 'Snacks', 'Jugos', 'Pasteles'];
  public categoriasData = [{
    data: [45, 25, 15, 15],
    backgroundColor: ['#795548', '#ff9800', '#4caf50', '#f06292']
  }];
  public categoriasType: ChartType = 'doughnut';
  public categoriasOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  // 📈 Ingresos mensuales
  public ingresosLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  public ingresosData = [{
    data: [1500, 2000, 1800, 2200, 2500, 2300],
    label: 'Ingresos ($)',
    fill: false,
    borderColor: '#3f51b5'
  }];
  public ingresosType: ChartType = 'line';
  public ingresosOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };
}
