import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';
import { MostrarInsumosComponent } from '../../../Inventario/mostrar-insumos/mostrar.insumos.component';
import { ProductosService } from '../../../../../services/products/products.service';

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  categorias: { id: number, nombre: string }[] = [];
  ingredientesSeleccionados: any[] = [];
  insumosSeleccionados: any[] = [];
  imagenProducto: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: any },
    private productosService: ProductosService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: [null, Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    console.log('✅ Producto recibido:', this.data.producto);

    this.productosService.obtenerCategorias().subscribe((cats) => {
      this.categorias = cats.map(c => ({
        id: Number(c.id),
        nombre: c.nombre
      }));

      console.log('📦 Categorías recibidas:', this.categorias);

      let idCategoria: number | null = null;

      if (this.data.producto.id_categoria) {
        idCategoria = Number(this.data.producto.id_categoria);
      } else if (this.data.producto.categoria?.id) {
        idCategoria = Number(this.data.producto.categoria.id);
      }

      const categoriaExiste = this.categorias.some(c => c.id === idCategoria);

      if (!categoriaExiste) {
        console.warn('⚠️ La categoría del producto no se encuentra en la lista. ID recibido:', idCategoria);
      }

      this.productoForm.patchValue({
        nombre: this.data.producto.nombre,
        categoria: idCategoria,
        precio: this.data.producto.precio,
        descripcion: this.data.producto.descripcion
      });

      this.ingredientesSeleccionados = this.data.producto.ingredientes || [];
      this.insumosSeleccionados = this.data.producto.insumos || [];
      this.imagenProducto = this.data.producto.imagen_url || this.data.producto.imagen || null;
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
    if (this.productoForm.valid) {
      const productoActualizado = {
        nombre: this.productoForm.value.nombre,
        id_categoria: Number(this.productoForm.value.categoria), // ✅ Garantiza que se mande como número
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
