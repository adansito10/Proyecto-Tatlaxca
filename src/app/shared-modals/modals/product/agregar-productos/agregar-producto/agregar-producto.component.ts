import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../ingredients/Mostrar-ingredientes/mostrar-ingredientes.component';
import { MostrarInsumosComponent } from '../../../supplies/mostrar-insumos/mostrar.insumos.component';
import { ProductosService } from '../../../../../services/products/products.service';

interface Categoria {
  id: number;
  nombre: string;
}
interface Ingrediente {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
}
interface Insumo {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
}

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  ingredientesSeleccionados: Ingrediente[] = [];
  insumosSeleccionados: Insumo[] = [];
  imagenProducto: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categorias: Categoria[] },
    private productosService: ProductosService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: [null, Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
    this.categorias = data.categorias ?? [];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      if (!base64.startsWith('data:image')) {
        alert('La imagen no es válida.');
        return;
      }
      this.imagenProducto = base64;
    };
    reader.readAsDataURL(file);
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
    if (this.productoForm.invalid || !this.imagenProducto) {
      alert('Por favor completa todos los campos obligatorios y selecciona una imagen.');
      return;
    }

    const producto = {
      nombre: this.productoForm.value.nombre,
      descripcion: this.productoForm.value.descripcion,
      precio: this.productoForm.value.precio,
      id_categoria: Number(this.productoForm.value.categoria),
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

    this.productosService.crearProducto(producto).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Error al guardar producto', err);
        alert('Error al guardar el producto');
      }
    });
  }
}
