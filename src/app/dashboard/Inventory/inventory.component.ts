import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSuministroComponent } from '../../shared-modals/modals/Inventario/agregar-suministro/agregar-suministro.component';
import { EditarSuministroComponent } from '../../shared-modals/modals/Inventario/editar-suministro/editar-suministro.component';
import { EliminarSuministroComponent } from '../../shared-modals/modals/Inventario/eliminar-suministro/eliminar-suministro.component';
import { InsumosService } from '../../services/supplies/supplies.service';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  filtroTexto: string = '';
  inventario: any[] = [];

  constructor(
    private dialog: MatDialog,
    private insumosService: InsumosService
  ) {}

  ngOnInit(): void {
    this.obtenerInsumos();
  }

  obtenerInsumos(): void {
    this.insumosService.obtenerInsumos().subscribe({
      next: (data) => {
        this.inventario = data.filter(i => i.stock !== -1);
      },
      error: (err) => {
        console.error('Error al cargar insumos', err);
      }
    });
  }

  get inventarioFiltrado() {
    const texto = this.filtroTexto.trim().toLowerCase();
    return this.inventario.filter(item =>
      item.nombre.toLowerCase().includes(texto)
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarSuministroComponent, {
      width: '600px',
      data: {
        modo: 'agregar',
        item: {
          nombre: '',
          stock: 0,
          unidad: ''
        }
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.insumosService.crearInsumo(resultado).subscribe({
          next: () => this.obtenerInsumos(),
          error: err => console.error('Error al guardar insumo:', err)
        });
      }
    });
  }

  abrirModalEditar(item: any): void {
    const dialogRef = this.dialog.open(EditarSuministroComponent, {
      width: '600px',
      data: {
        modo: 'editar',
        item: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.insumosService.actualizarInsumo(item.id, resultado).subscribe({
          next: () => this.obtenerInsumos(),
          error: err => console.error('Error al actualizar insumo', err)
        });
      }
    });
  }

  abrirModalEliminar(item: any): void {
    const dialogRef = this.dialog.open(EliminarSuministroComponent, {
      width: '400px',
      data: {
        nombreProducto: item.nombre
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.insumosService.eliminarInsumo(item.id).subscribe({
          next: () => this.obtenerInsumos(),
          error: err => console.error('Error al eliminar insumo', err)
        });
      }
    });
  }
}
