import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSuministroComponent } from '../../shared-modals/modals/supplies/agregar-suministro/agregar-suministro.component';
import { EliminarSuministroComponent } from '../../shared-modals/modals/supplies/eliminar-suministro/eliminar-suministro.component';
import { InsumosService } from '../../services/supplies/supplies.service';
import { Insumo } from '../../services/supplies/supplies.service';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-supplies',
  standalone: false,
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  filtroTexto = '';
  inventario: Insumo[] = [];

  constructor(
    private dialog: MatDialog,
    private insumosService: InsumosService,
    private notificacionesService: NotificacionesService

  ) {}

  ngOnInit(): void {
    this.obtenerInsumos();
  }

obtenerInsumos(): void {
  this.insumosService.obtenerInsumos().subscribe({
    next: (data) => {
      this.inventario = data.filter(i => i.stock !== -1);

      this.inventario.forEach(i => {
        if (i.stock >= 10) {
          this.notificacionesService.eliminarNotificacionPorNombre(i.nombre);
        }
      });
    },
    error: (err) => {
      console.error('Error al cargar insumos', err);
    }
  });
}


  get inventarioFiltrado(): Insumo[] {
    const texto = this.filtroTexto.trim().toLowerCase();
    return this.inventario.filter(item =>
      item.nombre.toLowerCase().includes(texto)
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarSuministroComponent, {
      width: '600px',
      data: {
        suministro: {
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

  abrirModalEditar(item: Insumo): void {
  const dialogRef = this.dialog.open(AgregarSuministroComponent, {
    width: '600px',
    data: {
      modo: 'editar', 
      suministro: item
    }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.insumosService.actualizarInsumo(item.id!, resultado).subscribe({
        next: () => this.obtenerInsumos(),
        
        error: err => console.error('Error al actualizar insumo', err)
      });
    }
  });
}


  abrirModalEliminar(item: Insumo): void {
    const dialogRef = this.dialog.open(EliminarSuministroComponent, {
      width: '400px',
      data: {
        nombreProducto: item.nombre
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.insumosService.eliminarInsumo(item.id!).subscribe({
          next: () => this.obtenerInsumos(),
          error: err => console.error('Error al eliminar insumo', err)
        });
      }
    });
  }
}
