import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingrediente-modal',
  standalone: false,
  templateUrl: './ingrediente-modal.component.html',
  styleUrls: ['./ingrediente-modal.component.scss']
})
export class IngredienteModalComponent {
  ingrediente: any;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<IngredienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ingrediente = data.entidad ? { ...data.entidad } : {
      nombre: '',
      unidad: '',
      stock: 0,
      imagen: ''
    };
  }

  getUnidadTexto(unidad: string): string {
    const unidades: {[key: string]: string} = {
      'kg': 'Kilogramos',
      'g': 'Gramos',
      'l': 'Litros',
      'ml': 'Mililitros',
      'unidad': 'Unidades'
    };
    return unidades[unidad] || unidad;
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
    document.getElementById('fileInput')?.click();
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.ingrediente.imagen = '';
  }

  guardar(): void {
    // Si hay una nueva imagen seleccionada, aquí podrías procesarla
    if (this.imagePreview) {
      this.ingrediente.imagen = this.imagePreview;
    }
    this.dialogRef.close(this.ingrediente);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  eliminar(): void {
    this.dialogRef.close({ eliminar: true, id: this.ingrediente.id });
  }
}