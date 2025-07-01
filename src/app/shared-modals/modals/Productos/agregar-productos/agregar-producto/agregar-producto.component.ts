import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';
import { MostrarInsumosComponent } from '../../../Inventario/mostrar-insumos/mostrar.insumos.component';
import { ProductosService } from '../../../../../services/products/products.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {
  productoForm: FormGroup;
  categorias: { id: number, nombre: string }[] = [];
  ingredientesSeleccionados: { id: number, nombre: string, cantidad: number }[] = [];
  insumosSeleccionados: { id: number, nombre: string, cantidad: number }[] = [];
  imagenProducto: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productosService: ProductosService,
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: [null, Validators.required],      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });

    if (data && data.categorias) {
      this.categorias = data.categorias;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (!base64.startsWith('data:image')) {
          alert('La imagen no es válida.');
          return;
        }
        this.imagenProducto = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  abrirModalIngredientes(): void {
    const dialogRef = this.dialog.open(MostrarIngredientesComponent, {
      width: '400px',
      data: { ingredientesActuales: this.ingredientesSeleccionados }
    });

    dialogRef.afterClosed().subscribe((seleccionados) => {
      if (Array.isArray(seleccionados)) {
        this.ingredientesSeleccionados = seleccionados;
      }
    });
  }

  abrirModalInsumos(): void {
    const dialogRef = this.dialog.open(MostrarInsumosComponent, {
      width: '400px',
      data: { insumosActuales: this.insumosSeleccionados }
    });

    dialogRef.afterClosed().subscribe((seleccionados) => {
      if (Array.isArray(seleccionados)) {
        this.insumosSeleccionados = seleccionados;
      }
    });
  }

  guardarProducto(): void {
    if (
      this.productoForm.valid &&
      this.imagenProducto &&
      this.ingredientesSeleccionados.length > 0
    ) {
      const idCategoria = Number(this.productoForm.value.categoria); 

      const productoCompleto = {
        nombre: this.productoForm.value.nombre,
        descripcion: this.productoForm.value.descripcion,
        precio: this.productoForm.value.precio,
        id_categoria: idCategoria,
        imagen: this.imagenProducto,
        ingredientes: this.ingredientesSeleccionados.map(i => ({
          id_ingrediente: i.id,
          cantidad: i.cantidad
        })),
        insumos: this.insumosSeleccionados.map(i => ({
          id_insumo: i.id,
          cantidad: i.cantidad
        }))
      };

      console.log('Producto a enviar:', productoCompleto);
    this.productosService.crearProducto(productoCompleto).subscribe({
      next: () => {
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.error('Error al guardar producto', err);
        alert('Error al guardar el producto');
      }
    });
  } else {
    alert('Faltan datos obligatorios o imagen');
  }
}

}