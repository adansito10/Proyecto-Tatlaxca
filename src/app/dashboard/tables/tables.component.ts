import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TablesService } from '../../services/tables/tables.service';
import { AgregarMesaComponent } from '../../shared-modals/modals/tables/agregar-tables/agregar-mesa.component';
import { EliminarMesaComponent } from '../../shared-modals/modals/tables/eliminar-tables/eliminar-mesa.component';

@Component({
  selector: 'app-tables',
  standalone: false,
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  mesas: any[] = [];
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
        this.mesas = data.filter(m => m.deleted_at === null);
      },
      error: err => console.error('Error al obtener mesas:', err)
    });
  }

  get mesasFiltradas(): any[] {
    const texto = this.filtro.toLowerCase().trim();
    return this.mesas.filter(m =>
      m.numero.toString().includes(texto) ||
      m.ubicacion.toLowerCase().includes(texto)
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarMesaComponent, {
      width: '500px',
      data: { modo: 'agregar' }
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

  abrirModalEditar(mesa: any): void {
    const dialogRef = this.dialog.open(AgregarMesaComponent, {
      width: '500px',
      data: { modo: 'editar', entidad: mesa }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablesService.actualizarMesa(mesa.id, result).subscribe({
          next: () => this.obtenerMesas(),
          error: err => console.error('Error al actualizar mesa:', err)
        });
      }
    });
  }

  abrirModalEliminar(mesa: any): void {
    const dialogRef = this.dialog.open(EliminarMesaComponent, {
      width: '400px',
      data: { numero: mesa.numero, id: mesa.id }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.tablesService.eliminarMesa(mesa.id).subscribe({
          next: () => this.obtenerMesas(),
          error: err => console.error('Error al eliminar mesa:', err)
        });
      }
    });
  }
}
