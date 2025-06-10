import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-modal',
  standalone: false,
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.scss']
})
export class ProductoModalComponent {
  modo: 'agregar' | 'editar' | 'eliminar' | 'ver';
  producto: any;
  mostrandoIngredientes: boolean = false;
  opcionesIngredientes: string[] = [
    'Queso', 'Tomate', 'Lechuga', 'Cebolla', 'Jalapeño', 'Pan', 'Salsa', 'Carne'
  ];
  ingredientesSeleccionados: string[] = ['', '', '', '', ''];
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ProductoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data.modo;
    
    this.producto = data.producto ? { ...data.producto } : {
      nombre: '',
      categoria: '',
      precio: 0,
      imagen: '',
      ingredientes: []
    };

    if (this.producto.ingredientes && Array.isArray(this.producto.ingredientes)) {
      this.ingredientesSeleccionados = [...this.producto.ingredientes];
      while (this.ingredientesSeleccionados.length < 5) {
        this.ingredientesSeleccionados.push('');
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona un archivo de imagen (JPEG, PNG)');
        return;
      }

      this.selectedFile = file;
      
    
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.producto.imagen = '';
  }

  guardar() {
    this.producto.ingredientes = this.ingredientesSeleccionados.filter(i => i);
    
    if (this.imagePreview) {
      this.producto.imagen = this.imagePreview;
    }
    
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }

  eliminar() {
    this.dialogRef.close({ eliminar: true, id: this.producto.id });
  }

  abrirAgregarIngredientes() {
    this.mostrandoIngredientes = true;
  }

  guardarIngredientes() {
    this.producto.ingredientes = this.ingredientesSeleccionados.filter(i => i);
    this.mostrandoIngredientes = false;
  }

  cancelarIngredientes() {
    this.mostrandoIngredientes = false;
  }
}