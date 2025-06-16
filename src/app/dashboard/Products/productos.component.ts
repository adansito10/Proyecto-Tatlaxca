import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
export class ProductosComponent {
  filtroTexto: string = '';
  filtroCategoria: string = '';
  categorias: string[] = ['Bebida', 'Comida', 'Postre'];

  productos = [
    {
      id: '00123',
      nombre: 'Café negro',
      categoria: 'Bebida',
      precio: 25.00,
      descripcion: '',
      imagen: '',
      ingredientes: ['Café', 'Agua']
    },
  ];

  constructor(private dialog: MatDialog) {}

  get productosFiltrados() {
    return this.productos.filter(p =>
      (!this.filtroCategoria || p.categoria === this.filtroCategoria)
      && (!this.filtroTexto || p.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()))
    );
  }

 

   abrirModalAgregar() {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '600px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;
      resultado.id = '00' + (this.productos.length + 123);
      this.productos.push(resultado);
    });
  }

  abrirModalEditar(producto: any) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '600px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;
      const idx = this.productos.findIndex(p => p.id === producto.id);
      if (idx !== -1) this.productos[idx] = resultado;
    });
  }

  abrirModalEliminar(producto: any) {
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '400px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado && resultado.eliminar) {
        this.productos = this.productos.filter(p => p.id !== producto.id);
      }
    });
  }

  abrirModalVer(producto: any) {
    this.dialog.open(VerProductoComponent, {
      width: '500px',
      data: { producto }
    });
  }
}