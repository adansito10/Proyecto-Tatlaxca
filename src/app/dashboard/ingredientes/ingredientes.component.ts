import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarIngredienteComponent } from '../../shared/modales/Ingredientes/agregar-ingrediente/agregar-ingrediente.component';
import { EliminarProductoComponent } from '../../shared/modales/Productos/eliminar-producto/eliminar-producto/eliminar-producto.component';
import { EditarIngredienteComponent } from '../../shared/modales/Ingredientes/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from '../../shared/modales/Ingredientes/eliminar-ingrediente/eliminar-ingrediente.component';


@Component({
  selector: 'app-ingredientes',
  standalone: false,
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss']
})
export class IngredientesComponent {
  ingredientes = [
    { id: '001', nombre: 'Harina', unidad: 'kg', stock: 50, imagen: 'assets/images/harina.jpg' },
    { id: '002', nombre: 'Azúcar', unidad: 'kg', stock: 30, imagen: 'assets/images/azucar.jpg' }
  ];

  constructor(private dialog: MatDialog) {}

  abrirModalAgregar() {
    const dialogRef = this.dialog.open(AgregarIngredienteComponent, {
      width: '500px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        resultado.id = '00' + (this.ingredientes.length + 1);
        this.ingredientes.push(resultado);
      }
    });
  }

  abrirModalEditar(ingrediente: any) {
    const dialogRef = this.dialog.open(EditarIngredienteComponent, {
      width: '500px',
      data: { modo: 'editar', entidad: ingrediente }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        const index = this.ingredientes.findIndex(i => i.id === ingrediente.id);
        if (index !== -1) {
          this.ingredientes[index] = resultado;
        }
      }
    });
  }

  abrirModalEliminar(ingrediente: any) {
    const dialogRef = this.dialog.open(EliminarIngredienteComponent, {
      width: '400px',
      data: { entidad: ingrediente }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado && resultado.eliminar) {
        this.ingredientes = this.ingredientes.filter(i => i.id !== ingrediente.id);
      }
    });
  }
}
