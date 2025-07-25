import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table, TablesService } from '../../services/tables/tables.service';
import { AgregarMesaComponent } from '../../shared-modals/modals/tables/agregar-tables/agregar-mesa.component';
import { EliminarMesaComponent } from '../../shared-modals/modals/tables/eliminar-tables/eliminar-mesa.component';

@Component({
  selector: 'app-tables',
  standalone: false,
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  mesas: Table[] = [];
  filtro: string = '';

  constructor(
    private dialog: MatDialog,
    private tablesService: TablesService
  ) {}

  ngOnInit(): void {
    this.obtenerMesas();
  }

  obtenerMesas(): void {
    this.tablesService.obtenerMesas().subscribe({
      next: data => {
         this.mesas = data;
      },
      error: err => console.error('Error al obtener mesas:', err)
    });
  }

get mesasFiltradas(): Table[] {
  const texto = this.filtro.trim().toLowerCase();

  return this.mesas
    .filter(m =>
      m.numero.toString().includes(texto) ||
      m.ubicacion.toLowerCase().includes(texto)
    )
    .sort((a, b) => {
      if (!a.deleted_at && b.deleted_at) return -1;
      if (a.deleted_at && !b.deleted_at) return 1;
      return 0;
    });
}

  restaurarMesa(mesa: Table): void {
  this.tablesService.restaurarMesa(mesa.id!).subscribe({
    next: () => this.obtenerMesas(),
    error: err => console.error('Error al restaurar mesa', err)
  });
}

alternarEstadoMesa(mesa: Table): void {
  if (mesa.deleted_at) {
    this.tablesService.restaurarMesa(mesa.id!).subscribe({
      next: () => this.obtenerMesas(),
      error: err => console.error('Error al restaurar mesa', err)
    });
  } else {
    this.tablesService.eliminarMesa(mesa.id!).subscribe({
      next: () => this.obtenerMesas(),
      error: err => console.error('Error al inactivar mesa', err)
    });
  }
}



  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarMesaComponent, {
      width: '500px',
      data: {
        modo: 'agregar' as 'agregar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablesService.crearMesa(result).subscribe({
          next: () => this.obtenerMesas(),
          error: err => console.error('Error al crear mesa:', err)
        });
      }
    });
  }

  abrirModalEditar(mesa: Table): void {
    const dialogRef = this.dialog.open(AgregarMesaComponent, {
      width: '500px',
      data: {
        modo: 'editar' as 'editar',
        entidad: mesa
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablesService.actualizarMesa(mesa.id!, result).subscribe({
          next: () => this.obtenerMesas(),
          error: err => console.error('Error al actualizar mesa:', err)
        });
      }
    });
  }

  abrirModalEliminar(mesa: Table): void {
    const dialogRef = this.dialog.open(EliminarMesaComponent, {
      width: '400px',
      data: {
        numero: mesa.numero,
        id: mesa.id
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.tablesService.eliminarMesa(mesa.id!).subscribe({
          next: () => this.obtenerMesas(),
          error: err => console.error('Error al eliminar mesa:', err)
        });
      }
    });
  }
}
