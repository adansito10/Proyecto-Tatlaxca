import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent {
  productoForm: FormGroup;
  ingredientesSeleccionados: string[] = [];
  imagenProducto: string | ArrayBuffer | null = null;
  modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'agregar' | 'editar', producto: any }
  ) {
    this.modo = data.modo;

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });

    if (data.producto) {
      this.productoForm.patchValue({
        nombre: data.producto.nombre,
        categoria: data.producto.categoria,
        precio: data.producto.precio,
        descripcion: data.producto.descripcion
      });

      this.ingredientesSeleccionados = data.producto.ingredientes || [];
      this.imagenProducto = data.producto.imagen || null;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenProducto = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  abrirModalIngredientes(): void {
    const dialogRef = this.dialog.open(MostrarIngredientesComponent, {
      width: '400px',
      data: { ingredientesActuales: this.ingredientesSeleccionados }
    });

    dialogRef.afterClosed().subscribe((seleccionados: string[]) => {
      if (seleccionados?.length > 0) {
        this.ingredientesSeleccionados = seleccionados;
      }
    });
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const productoActualizado = {
        ...this.productoForm.value,
        ingredientes: this.ingredientesSeleccionados,
        imagen: this.imagenProducto
      };

      this.dialogRef.close(productoActualizado);
    }
  }
}
