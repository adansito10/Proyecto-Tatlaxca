import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientesService } from '../../services/ingredientes.service';
import { AgregarIngredienteComponent } from '../../shared/modales/Ingredientes/agregar-ingrediente/agregar-ingrediente.component';
import { EditarIngredienteComponent } from '../../shared/modales/Ingredientes/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from '../../shared/modales/Ingredientes/eliminar-ingrediente/eliminar-ingrediente.component';

@Component({
  selector: 'app-ingredientes',
  standalone: false,
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss']
})
export class IngredientesComponent implements OnInit {
  ingredientes: any[] = [];

  constructor(
    private dialog: MatDialog,
    private ingredientesService: IngredientesService
  ) {}

  ngOnInit(): void {
    this.obtenerIngredientes();
  }

  obtenerIngredientes() {
    this.ingredientesService.obtenerIngredientes().subscribe(data => {
      this.ingredientes = data.filter(i => i.stock !== -1);
    });
  }

  abrirModalAgregar() {
    const dialogRef = this.dialog.open(AgregarIngredienteComponent, {
      width: '500px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ingredientesService.crearIngrediente(resultado).subscribe(() => {
          this.obtenerIngredientes();
        });
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
        this.ingredientesService.actualizarIngrediente(ingrediente.id, resultado).subscribe(() => {
          this.obtenerIngredientes();
        });
      }
    });
  }

  abrirModalEliminar(ingrediente: any) {
  const dialogRef = this.dialog.open(EliminarIngredienteComponent, {
    width: '400px',
    data: { 
      nombre: ingrediente.nombre,
      id: ingrediente.id
    }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.ingredientesService.eliminarIngrediente(ingrediente.id).subscribe({
        next: () => {
          // Actualizar la vista filtrando el ingrediente "eliminado"
          this.ingredientes = this.ingredientes.filter(i => i.id !== ingrediente.id);
          // Alternativamente: this.obtenerIngredientes(); para recargar todo
        },
        error: (error) => {
          console.error('Error al eliminar ingrediente:', error);
          // Mostrar mensaje de error al usuario si es necesario
        }
      });
    }
  });
  }
}