import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-ingrediente',
  standalone: false,
  templateUrl: './agregar-ingrediente.component.html',
  styleUrl: './agregar-ingrediente.component.scss'
})
export class AgregarIngredienteComponent {

 ingredienteForm: FormGroup;
  imagenIngrediente: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ingredienteForm = this.fb.group({
      nombre: [data.entidad?.nombre || '', Validators.required],
      unidad: [data.entidad?.unidad || '', Validators.required],
      stock: [data.entidad?.stock || 0, [Validators.required, Validators.min(0)]]
    });

    this.imagenIngrediente = data.entidad?.imagen || null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG)');
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenIngrediente = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagenIngrediente = null;
    this.fileInput.nativeElement.value = '';
  }

  guardarIngrediente(): void {
    if (this.ingredienteForm.invalid) return;

    const ingrediente = {
      ...this.ingredienteForm.value,
      imagen: this.imagenIngrediente
    };

    this.dialogRef.close(ingrediente);
  }
}
