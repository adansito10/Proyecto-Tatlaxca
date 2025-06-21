import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from '../../services/products-service/products.service';
import { AgregarProductoComponent } from '../../shared/modales/Productos/agregar-productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../../shared/modales/Productos/editar-producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../../shared/modales/Productos/eliminar-producto/eliminar-producto/eliminar-producto.component';
import { VerProductoComponent } from '../../shared/modales/Productos/ver-producto/ver-producto/ver-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: false
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  filtroTexto: string = '';
  filtroCategoria: string = '';
  categorias: string[] = ['Bebida', 'Comida', 'Postre'];

  constructor(private dialog: MatDialog, private productosService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: data => {
        this.productos = data.filter(p => !p.eliminado);
      },
      error: err => console.error('Error al obtener productos:', err)
    });
  }

  get productosFiltrados() {
    return this.productos.filter(p =>
      (!this.filtroCategoria || p.categoria === this.filtroCategoria) &&
      (!this.filtroTexto || p.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()))
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '600px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.productosService.crearProducto(resultado).subscribe({
          next: () => this.obtenerProductos(),
          error: err => console.error('Error al crear producto:', err)
        });
      }
    });
  }

  abrirModalEditar(producto: any): void {
  const dialogRef = this.dialog.open(EditarProductoComponent, {
    width: '600px',
    data: { modo: 'editar', producto }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.productosService.actualizarProducto(producto.id, resultado).subscribe({
        next: () => {
          const index = this.productos.findIndex(p => p.id === producto.id);
          if (index !== -1) {
            this.productos[index] = { ...this.productos[index], ...resultado };
          }
        },
        error: err => console.error('Error al actualizar producto:', err)
      });
    }
  });
  }

  abrirModalEliminar(producto: any): void {
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '400px',
      data: { nombre: producto.nombre, id: producto.id }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.productosService.eliminarProducto(producto.id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== producto.id);
          },
          error: err => console.error('Error al eliminar producto:', err)
        });
      }
    });
  }

  abrirModalVer(producto: any): void {
    this.dialog.open(VerProductoComponent, {
      width: '500px',
      data: { producto }
    });
  }
}
