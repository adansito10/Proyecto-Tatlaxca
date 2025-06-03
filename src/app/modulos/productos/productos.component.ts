import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarProductoComponent } from './modals/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './modals/editar-producto/editar-producto.component';
import { VerIngredientesComponent } from './modals/ver-ingredientes/ver-ingredientes.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  standalone: false
})
export class ProductosComponent {
  productos = [
    { id: 1, nombre: 'Manzana', precio: 10 },
    { id: 2, nombre: 'Pan', precio: 15 }
  ];

  constructor(private dialog: MatDialog) {}

  abrirModalAgregar() {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Producto agregado:', result);
        this.productos.push(result);
      }
    });
  }

  abrirModalEditar(producto: any) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: { ...producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.productos.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.productos[index] = result;
          console.log('Producto editado:', result);
        }
      }
    });
  }

  abrirModalVer(producto: any) {
    this.dialog.open(VerIngredientesComponent, {
      width: '400px',
      data: { ...producto }
    });
  }
}
