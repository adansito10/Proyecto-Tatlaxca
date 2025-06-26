import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSuministroComponent } from '../../shared/modales/Inventario/agregar-suministro/agregar-suministro.component';
import { EditarSuministroComponent } from '../../shared/modales/Inventario/editar-suministro/editar-suministro.component';
import { EliminarSuministroComponent } from '../../shared/modales/Inventario/eliminar-suministro/eliminar-suministro.component';
import { InsumosService } from '../../services/insumos/insumos.service';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {
  filtroTexto: string = '';
  filtroCategoria: string = '';
  categorias: string[] = ['Desechables', 'Limpieza', 'Bebidas', 'Alimentos', 'Equipo'];
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
        this.inventario = data.filter(i => i.stock !== -1); // evitar eliminados lógicamente
      },
      error: (err) => {
        console.error('Error al cargar insumos:', err);
      }
    });
  }

  get inventarioFiltrado() {
    return this.inventario.filter(item => {
      const texto = this.filtroTexto.toLowerCase();
      const cumpleTexto = item.nombre.toLowerCase().includes(texto) || item.id.toString().includes(texto);
      const cumpleCategoria = !this.filtroCategoria || item.categoria === this.filtroCategoria;
      return cumpleTexto && cumpleCategoria;
    });
  }

  abrirModalAgregar() {
    const dialogRef = this.dialog.open(AgregarSuministroComponent, {
      width: '600px',
      data: {
        modo: 'agregar',
        item: {
          nombre: '',
          stock: 0,
          stockMinimo: 0,
          unidad: 'pieza',
          ultimaCompra: new Date().toISOString().split('T')[0]
        },
        categorias: this.categorias
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

  abrirModalEditar(item: any) {
    const dialogRef = this.dialog.open(EditarSuministroComponent, {
      width: '600px',
      data: {
        modo: 'editar',
        item: { ...item },
        categorias: this.categorias
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.insumosService.actualizarInsumo(item.id, resultado).subscribe({
          next: () => this.obtenerInsumos(),
          error: err => console.error('Error al actualizar insumo:', err)
        });
      }
    });
  }

  abrirModalEliminar(item: any) {
    const dialogRef = this.dialog.open(EliminarSuministroComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: `¿Estás seguro de eliminar el artículo ${item.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.insumosService.eliminarInsumo(item.id).subscribe({
          next: () => this.obtenerInsumos(),
          error: err => console.error('Error al eliminar insumo:', err)
        });
      }
    });
  }
}
