import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';
import { MostrarInsumosComponent } from '../../../Inventario/mostrar-insumos/mostrar.insumos.component';

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']  
})
export class EditarProductoComponent {
  productoForm: FormGroup;
  categorias: { id: number, nombre: string }[] = [];
  ingredientesSeleccionados: { id: number, nombre: string, cantidad: number }[] = [];
  insumosSeleccionados: { id: number, nombre: string, cantidad: number }[] = [];

  imagenProducto: string | ArrayBuffer | null = null;
  modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'agregar' | 'editar', producto: any, categorias?: {id:number, nombre:string}[] }
  ) {
    this.modo = data.modo;

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: data.producto.id_categoria,
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: [''],
    });

    if (data.categorias) {
      this.categorias = data.categorias;
    }

    if (data.producto) {
      this.productoForm.patchValue({
        nombre: data.producto.nombre,
        categoria: data.producto.id_categoria || (data.producto.categoria ? data.producto.categoria.id : null),
        precio: data.producto.precio,
        descripcion: data.producto.descripcion
      });

      this.ingredientesSeleccionados = data.producto.ingredientes || [];
      this.insumosSeleccionados = data.producto.insumos || [];
      this.imagenProducto = data.producto.imagen_url || data.producto.imagen || null;
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

    dialogRef.afterClosed().subscribe((seleccionados: {id:number, nombre:string, cantidad:number}[]) => {
      if (seleccionados && seleccionados.length > 0) {
        this.ingredientesSeleccionados = seleccionados;
      }
    });
  }

  abrirModalInsumos(): void {
    const dialogRef = this.dialog.open(MostrarInsumosComponent, {
      width: '400px',
      data: { insumosActuales: this.insumosSeleccionados }
    });

    dialogRef.afterClosed().subscribe((seleccionados: {id:number, nombre:string, cantidad:number}[]) => {
      if (seleccionados && seleccionados.length > 0) {
        this.insumosSeleccionados = seleccionados;
      }
    });
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const productoActualizado = {
        nombre: this.productoForm.value.nombre,
        id_categoria: this.productoForm.value.categoria,
        precio: this.productoForm.value.precio,
        descripcion: this.productoForm.value.descripcion,
        ingredientes: this.ingredientesSeleccionados.map(i => ({
          id_ingrediente: i.id,
          cantidad: i.cantidad
        })),
        insumos: this.insumosSeleccionados.map(i => ({
          id_insumo: i.id,
          cantidad: i.cantidad
        })),
        imagen: this.imagenProducto
      };

      this.dialogRef.close(productoActualizado);
    }
  }
}
