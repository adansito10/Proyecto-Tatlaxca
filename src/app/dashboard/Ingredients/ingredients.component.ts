 import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarIngredienteComponent } from '../../shared-modals/modals/ingredients/agregar-ingrediente/agregar-ingrediente.component';
import { EditarIngredienteComponent } from '../../shared-modals/modals/ingredients/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from '../../shared-modals/modals/ingredients/eliminar-ingrediente/eliminar-ingrediente.component';
import { IngredientsService, Ingrediente } from '../../services/Ingredients/ingredients.service';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-ingredients',
  standalone: false,
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  filtroNombre: string = '';

  UMBRAL_POR_UNIDAD: Record<string, number> = {
  'g': 500,
  'ml': 1000,
  'u': 10
};


  constructor(
    private dialog: MatDialog,
    private ingredientsService: IngredientsService, 
    private notificacionesService: NotificacionesService

  ) {}

  ngOnInit(): void {
    this.obtenerIngredientes();
  }

obtenerIngredientes(): void {
  this.ingredientsService.obtenerIngredientes().subscribe({
    next: data => {
      this.ingredientes = data.filter(i => i.stock !== -1);

      const UMBRAL = {
        'g': 500,
        'ml': 1000,
        'u': 10
      };

      this.ingredientes.forEach(i => {
       const unidad = (i.unidad ?? 'u').toLowerCase() as 'g' | 'ml' | 'u';
const umbral = UMBRAL[unidad] ?? 10;

        const mensaje = `Stock bajo de ${i.nombre} (${i.stock} ${i.unidad})`;

        if (i.stock < umbral) {
          if (!this.notificacionesService.contiene(mensaje)) {
            this.notificacionesService.agregarNotificacion(mensaje);
          }
        } else {
          this.notificacionesService.eliminarNotificacionPorNombre(i.nombre);
        }
      });
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


  esStockBajo(ingrediente: Ingrediente): boolean {
  const unidad = ingrediente.unidad?.toLowerCase() || 'u';
  const umbral = this.UMBRAL_POR_UNIDAD[unidad] ?? 10;
  return ingrediente.stock < umbral;
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