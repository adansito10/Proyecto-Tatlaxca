import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from '../../services/products/products.service';
import { AgregarProductoComponent } from '../../shared-modals/modals/Productos/agregar-productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../../shared-modals/modals/Productos/editar-producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../../shared-modals/modals/Productos/eliminar-producto/eliminar-producto/eliminar-producto.component';
import { VerProductoComponent } from '../../shared-modals/modals/Productos/ver-producto/ver-producto/ver-producto.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: false
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  filtroTexto: string = '';
  filtroCategoria: string = '';
  categorias: { id: number, nombre: string }[] = [];

  constructor(private dialog: MatDialog, private productosService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: data => {
        this.productos = data.filter(p => !p.eliminado);
      },
      error: err => console.error('Error al obtener productos', err)
    });
  }

  obtenerCategorias(): void {
    this.productosService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: err => console.error('Error al obtener categorías', err)
    });
  }

  get productosFiltrados() {
    return this.productos.filter(p => {
      const categoriaNombre = typeof p.categoria === 'string'
        ? p.categoria
        : p.categoria?.nombre;

      return (!this.filtroCategoria || categoriaNombre === this.filtroCategoria) &&
             (!this.filtroTexto || p.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()));
    });
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '600px',
      data: { modo: 'agregar', categorias: this.categorias }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === true) {
        this.obtenerProductos();
      }
    });
  }

 abrirModalEditar(producto: any): void {
  const dialogRef = this.dialog.open(EditarProductoComponent, {
    width: '600px',
    data: { modo: 'editar', producto, categorias: this.categorias }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      if (!resultado.id) {
        resultado.id = producto.id;
      }
      this.productosService.actualizarProducto(String(producto.id), resultado).subscribe({
        next: (productoActualizado) => {
          // En vez de actualizar localmente el array, recarga TODOS los productos:
          this.obtenerProductos();
        },
        error: err => {
          console.error('Error al actualizar producto:', err);
          alert('Error al actualizar producto. Revisa la consola para más detalles.');
        }
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
          error: err => console.error('Error al eliminar producto', err)
        });
      }
    });
  }

 abrirModalVer(producto: any): void {
  this.productosService.obtenerProductoPorId(producto.id).subscribe((productoActualizado) => {
    this.dialog.open(VerProductoComponent, {
      width: '800px',
      data: {
        ingredientes: productoActualizado.ingredientes || [],
        insumos: productoActualizado.insumos || []
      }
    });
  });


  
  }


  
}
