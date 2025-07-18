 import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarIngredienteComponent } from '../../shared-modals/modals/ingredients/agregar-ingrediente/agregar-ingrediente.component';
import { EditarIngredienteComponent } from '../../shared-modals/modals/ingredients/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from '../../shared-modals/modals/ingredients/eliminar-ingrediente/eliminar-ingrediente.component';
import { IngredientsService, Ingrediente } from '../../services/Ingredients/ingredients.service';

@Component({
  selector: 'app-ingredients',
  standalone: false,
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  filtroNombre: string = '';

  constructor(
    private dialog: MatDialog,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit(): void {
    this.obtenerIngredientes();
  }

  obtenerIngredientes(): void {
    this.ingredientsService.obtenerIngredientes().subscribe({
      next: data => {
        this.ingredientes = data.filter(i => i.stock !== -1);
      },
      error: error => {
        console.error('Error al obtener ingredientes', error);
      }
    });
  }

  get ingredientesFiltrados(): Ingrediente[] {
    const texto = this.filtroNombre.toLowerCase().trim();
    return this.ingredientes.filter(ing =>
      ing.nombre.toLowerCase().includes(texto)
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarIngredienteComponent, {
      width: '500px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ingredientsService.crearIngrediente(resultado).subscribe({
          next: () => this.obtenerIngredientes(),
          error: err => console.error('Error al crear ingrediente:', err)
        });
      }
    });
  }

  abrirModalEditar(ingrediente: Ingrediente): void {
    const dialogRef = this.dialog.open(EditarIngredienteComponent, {
      width: '500px',
      data: { modo: 'editar', entidad: ingrediente }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ingredientsService.actualizarIngrediente(ingrediente.id, resultado).subscribe({
          next: () => this.obtenerIngredientes(),
          error: err => console.error('Error al actualizar ingrediente:', err)
        });
      }
    });
  }

  abrirModalEliminar(ingrediente: Ingrediente): void {
    const dialogRef = this.dialog.open(EliminarIngredienteComponent, {
      width: '400px',
      data: {
        nombre: ingrediente.nombre,
        id: ingrediente.id
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.ingredientsService.eliminarIngrediente(ingrediente.id).subscribe({
          next: () => {
            this.ingredientes = this.ingredientes.filter(i => i.id !== ingrediente.id);
          },
          error: err => console.error('Error al eliminar ingrediente:', err)
        });
      }
    });
  }
}