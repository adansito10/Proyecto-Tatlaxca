import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common'; // para hacer scroll
import { ElementRef } from '@angular/core';
import { AgregarSuministroComponent } from '../../shared-modals/modals/supplies/agregar-suministro/agregar-suministro.component';
import { EliminarSuministroComponent } from '../../shared-modals/modals/supplies/eliminar-suministro/eliminar-suministro.component';
import { InsumosService } from '../../services/supplies/supplies.service';
import { Insumo } from '../../services/supplies/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  filtroTexto = '';
  inventario: Insumo[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private insumosService: InsumosService,
    private scroller: ViewportScroller,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerInsumos();
    this.route.queryParams.subscribe((params) => {
      const nombre = params['nombre'];
      if (nombre) {
        this.filtroTexto = nombre;
        setTimeout(() => {
          this.scrollYResaltar(nombre);
        }, 300);
      }
    });
  }

  obtenerInsumos(): void {
    this.insumosService.obtenerInsumos().subscribe({
      next: (data) => {
        this.inventario = data.filter((i) => i.stock !== -1);
      },
      error: (err) => {
        console.error('Error al cargar insumos', err);
      },
    });
  }

  get inventarioFiltrado(): Insumo[] {
    const texto = this.filtroTexto.trim().toLowerCase();

    return this.inventario
      .filter((item) => item.nombre.toLowerCase().includes(texto))
      .sort((a, b) => {
        if (!a.deleted_at && b.deleted_at) return -1;
        if (a.deleted_at && !b.deleted_at) return 1;
        return 0;
      });
  }

  activarInsumo(item: Insumo): void {
    if (item.deleted_at) {
      this.insumosService.activarInsumo(item.id).subscribe({
        next: () => this.obtenerInsumos(),
        error: (err) => console.error('Error al activar insumo', err),
      });
    } else {
      this.insumosService.eliminarInsumo(item.id).subscribe({
        next: () => this.obtenerInsumos(),
        error: (err) => console.error('Error al eliminar insumo', err),
      });
    }
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarSuministroComponent, {
      width: '600px',
      data: {
        suministro: {
          nombre: '',
          stock: 0,
          unidad: '',
        },
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.insumosService.crearInsumo(resultado).subscribe({
          next: () => {
            this.obtenerInsumos();
            this.snackBar.open('Insumo creado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          },
          error: (err) => {
            console.error('Error al guardar insumo:', err);
            this.snackBar.open('Error al crear insumo', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  abrirModalEditar(item: Insumo): void {
    const dialogRef = this.dialog.open(AgregarSuministroComponent, {
      width: '600px',
      data: {
        modo: 'editar',
        suministro: item,
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.insumosService.actualizarInsumo(item.id!, resultado).subscribe({
          next: () => {
            this.obtenerInsumos();
            this.snackBar.open('Insumo actualizado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          },
          error: (err) => {
            console.error('Error al actualizar insumo', err);
            this.snackBar.open('Error al actualizar insumo', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  abrirModalEliminar(item: Insumo): void {
    const dialogRef = this.dialog.open(EliminarSuministroComponent, {
      width: '400px',
      data: {
        nombreProducto: item.nombre,
      },
    });
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.insumosService.eliminarInsumo(item.id!).subscribe({
          next: () => {
            this.obtenerInsumos();
            this.snackBar.open('Insumo eliminado exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          },
          error: (err) => {
            console.error('Error al eliminar insumo', err);
            this.snackBar.open('Error al eliminar insumo', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  scrollYResaltar(nombre: string) {
    const el = document.getElementById(nombre);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight-temp');
      setTimeout(() => {
        el.classList.remove('highlight-temp');
      }, 3000);
    }
  }
}
