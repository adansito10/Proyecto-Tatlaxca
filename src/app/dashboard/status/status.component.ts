import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusService } from '../../services/status/status.service';
import { AgregarStatusComponent } from '../../shared-modals/modals/status/agrega-status/agregar-status.component';
import { EliminarStatusComponent } from '../../shared-modals/modals/status/eliminar-status/eliminar-status.component';

@Component({
  selector: 'app-status',
  standalone: false,
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  estados: any[] = [];
  filtro: string = '';

  constructor(
    private dialog: MatDialog,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.obtenerEstados();
  }

  obtenerEstados(): void {
    this.statusService.obtenerStatus().subscribe({
      next: data => {
        this.estados = data.filter(e => !e.deleted_at);
      },
      error: err => console.error('Error al obtener estados:', err)
    });
  }

  get estadosFiltrados(): any[] {
    const texto = this.filtro.toLowerCase().trim();
    return this.estados.filter(e =>
      e.estado.toLowerCase().includes(texto) ||
      (e.descripcion?.toLowerCase().includes(texto) ?? false)
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarStatusComponent, {
      width: '500px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.statusService.crearStatus(result).subscribe({
          next: () => this.obtenerEstados(),
          error: err => console.error('Error al crear estado:', err)
        });
      }
    });
  }

  abrirModalEditar(estado: any): void {
    const dialogRef = this.dialog.open(AgregarStatusComponent, {
      width: '500px',
      data: { modo: 'editar', entidad: estado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.statusService.actualizarStatus(estado.id, result).subscribe({
          next: () => this.obtenerEstados(),
          error: err => console.error('Error al actualizar estado:', err)
        });
      }
    });
  }

  abrirModalEliminar(estado: any): void {
    const dialogRef = this.dialog.open(EliminarStatusComponent, {
      width: '400px',
      data: { nombre: `Estado ${estado.estado}`, id: estado.id }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.statusService.eliminarStatus(estado.id).subscribe({
          next: () => this.obtenerEstados(),
          error: err => console.error('Error al eliminar estado:', err)
        });
      }
    });
  }
}
