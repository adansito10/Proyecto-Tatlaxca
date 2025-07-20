import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from '../../services/products/products.service';
import { AgregarProductoComponent } from '../../shared-modals/modals/product/agregar-productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../../shared-modals/modals/product/editar-producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../../shared-modals/modals/product/eliminar-producto/eliminar-producto/eliminar-producto.component';
import { VerProductoComponent } from '../../shared-modals/modals/product/ver-producto/ver-producto/ver-producto.component';

interface Categoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen: string;
  categoria: Categoria | string;
  eliminado?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  filtroTexto = '';
  filtroCategoria = '';

  constructor(
    private dialog: MatDialog,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos.filter(p => !p.eliminado);
      },
      error: (err) => this.logError('obtener productos', err)
    });
  }

  cargarCategorias(): void {
    this.productosService.obtenerCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => this.logError('obtener categorías', err)
    });
  }

  get productosFiltrados(): Producto[] {
    return this.productos.filter(p => {
      const categoriaNombre =
        typeof p.categoria === 'string'
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

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === true) {
        this.cargarProductos();
      }
    });
  }

  abrirModalEditar(producto: Producto): void {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '600px',
      data: { modo: 'editar', producto, categorias: this.categorias }
    });

    dialogRef.afterClosed().subscribe((actualizado) => {
      if (actualizado) {
        const productoAEnviar = { ...actualizado, id: actualizado.id ?? producto.id };
        this.productosService.actualizarProducto(String(producto.id), productoAEnviar).subscribe({
          next: () => this.cargarProductos(),
          error: (err) => this.logError('actualizar producto', err, true)
        });
      }
    });
  }

  abrirModalEliminar(producto: Producto): void {
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '400px',
      data: { nombre: producto.nombre, id: String(producto.id) }
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.productosService.eliminarProducto(producto.id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== producto.id);
          },
          error: (err) => this.logError('eliminar producto', err)
        });
      }
    });
  }

  abrirModalVer(producto: Producto): void {
    this.productosService.obtenerProductoPorId(producto.id).subscribe((detalle) => {
      this.dialog.open(VerProductoComponent, {
        width: '800px',
        data: {
          ingredientes: detalle.ingredientes ?? [],
          insumos: detalle.insumos ?? []
        }
      });
    });
  }

  getNombreCategoria(categoria: string | { nombre: string }): string {
  return typeof categoria === 'string' ? categoria : categoria?.nombre ?? 'Sin categoría';
}


  private logError(accion: string, error: any, mostrarAlerta = false): void {
    console.error(`Error al ${accion}:`, error);
    if (mostrarAlerta) {
      alert(`Error al ${accion}. Consulta la consola para más detalles.`);
    }
  }
}
