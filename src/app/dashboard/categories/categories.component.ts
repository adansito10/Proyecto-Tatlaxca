import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService, Categoria } from '../../services/categories/categories.service';
import { AgregarCategoriesComponent } from '../../shared-modals/modals/categories/agregar-categoria/agregar-categoria.component';
import { EliminarCategoryComponent } from '../../shared-modals/modals/categories/eliminar-categoria/eliminar-categoria-component';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Categoria[] = [];
  filtroNombre = '';

  constructor(private dialog: MatDialog, private categoriesService: CategoriesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.obtenerCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error('Error cargando categorías', err)
    });
  }

  get filteredCategories(): Categoria[] {
    const txt = this.filtroNombre.toLowerCase().trim();
    return this.categories.filter(c => c.nombre.toLowerCase().includes(txt));
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(AgregarCategoriesComponent, {
      width: '500px',
      data: { modo: 'agregar' }
    });
   dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.categoriesService.crearCategory(res).subscribe(() => {
          this.loadCategories();
          this.snackBar.open('Categoría creada correctamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }

  openEdit(category: Categoria): void {
    const dialogRef = this.dialog.open(AgregarCategoriesComponent, {
      width: '500px',
      data: { modo: 'editar', category }
    });
      dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.categoriesService.actualizarCategory(category.id, res).subscribe(() => {
          this.loadCategories();
          this.snackBar.open('Categoría actualizada correctamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }

  openDelete(category: Categoria): void {
    const dialogRef = this.dialog.open(EliminarCategoryComponent, {
      width: '400px',
      data: category
    });
     dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.categoriesService.eliminarCategory(category.id).subscribe(() => {
          this.loadCategories();
          this.snackBar.open('Categoría eliminada correctamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }
}