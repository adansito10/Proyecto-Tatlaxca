import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export class AgregarProductoComponent {
  productoForm: FormGroup;
  ingredientesSeleccionados: string[] = [];
  imagenProducto: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AgregarProductoComponent>
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
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
      if (seleccionados && seleccionados.length > 0) {
        this.ingredientesSeleccionados = seleccionados;
      }
    });
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const nuevoProducto = {
        ...this.productoForm.value,
        ingredientes: this.ingredientesSeleccionados,
        imagen: this.imagenProducto
      };

      console.log('Producto guardado:', nuevoProducto);

      this.dialogRef.close(nuevoProducto);
    }
  }
}