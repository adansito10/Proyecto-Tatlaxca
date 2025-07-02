import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MostrarIngredientesComponent } from '../../../Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';
import { MostrarInsumosComponent } from '../../../Inventario/mostrar-insumos/mostrar.insumos.component';
import { ProductosService } from '../../../../../services/products/products.service';

interface Categoria { id: number; nombre: string; }
interface Ingrediente { id: number; nombre: string; cantidad: number; }
interface Insumo { id: number; nombre: string; cantidad: number; }

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  ingredientesSeleccionados: Ingrediente[] = [];
  insumosSeleccionados: Insumo[] = [];
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
    this.productosService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias.map(c => ({
        id: Number(c.id),
        nombre: c.nombre
      }));
      this.cargarDatosProducto(this.data.producto);
    });
  }

  private cargarDatosProducto(producto: any): void {
    const idCategoria = producto.id_categoria ?? producto.categoria?.id ?? null;

    this.productoForm.patchValue({
      nombre: producto.nombre ?? '',
      categoria: Number(idCategoria),
      precio: producto.precio ?? null,
      descripcion: producto.descripcion ?? ''
    });

    this.ingredientesSeleccionados = this.mapItemsToIngredientes(producto.ingredientes);
    this.insumosSeleccionados = this.mapItemsToInsumos(producto.insumos);
    // Aquí asignamos la URL de la imagen que ya existe
    this.imagenProducto = producto.imagen_url ?? producto.imagen ?? null;
  }

  private mapItemsToIngredientes(items: any[]): Ingrediente[] {
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
      id: item.id ?? item.id_ingrediente,
      nombre: item.nombre ?? '',
      cantidad: item.cantidad ?? 1
    }));
  }

  private mapItemsToInsumos(items: any[]): Insumo[] {
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
      id: item.id ?? item.id_insumo,
      nombre: item.nombre ?? '',
      cantidad: item.cantidad ?? 1
    }));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenProducto = reader.result;
    };
    reader.readAsDataURL(file);
  }

  abrirModalIngredientes(): void {
    const dialogRef = this.dialog.open(MostrarIngredientesComponent, {
      width: '500px',
      data: {
        ingredientesActuales: JSON.parse(JSON.stringify(this.ingredientesSeleccionados))
      }
    });

    dialogRef.afterClosed().subscribe((resultado: Ingrediente[] | undefined) => {
      if (Array.isArray(resultado)) {
        this.ingredientesSeleccionados = resultado;
      }
    });
  }

  abrirModalInsumos(): void {
    const dialogRef = this.dialog.open(MostrarInsumosComponent, {
      width: '500px',
      data: {
        insumosActuales: JSON.parse(JSON.stringify(this.insumosSeleccionados))
      }
    });

    dialogRef.afterClosed().subscribe((resultado: Insumo[] | undefined) => {
      if (Array.isArray(resultado)) {
        this.insumosSeleccionados = resultado;
      }
    });
  }

  guardarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    let imagenParaEnviar;
    if (typeof this.imagenProducto === 'string' && this.imagenProducto.startsWith('data:image')) {
      imagenParaEnviar = this.imagenProducto;
    }

    const productoActualizado = {
      id: this.data.producto.id,
      nombre: this.productoForm.value.nombre,
      id_categoria: Number(this.productoForm.value.categoria),
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
      ...(imagenParaEnviar && { imagen: imagenParaEnviar })
    };

    this.dialogRef.close(productoActualizado);
  }
}
