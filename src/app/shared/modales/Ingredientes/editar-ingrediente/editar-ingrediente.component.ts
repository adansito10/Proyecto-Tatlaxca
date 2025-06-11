import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Ingrediente {
  nombre: string;
  unidad: string;
  stock: number;
  imagen?: string | null;
}

@Component({
  selector: 'app-editar-ingrediente',
  standalone: false,
  templateUrl: './editar-ingrediente.component.html',
  styleUrls: ['./editar-ingrediente.component.scss']
})
export class EditarIngredienteComponent implements OnInit {
  form: FormGroup;
  modo: 'agregar' | 'editar';
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'agregar' | 'editar', entidad: Ingrediente }
  ) {
    this.modo = data.modo;

    // Inicializar formulario con valores según modo
    this.form = this.fb.group({
      nombre: [data.entidad?.nombre || '', Validators.required],
      unidad: [data.entidad?.unidad || '', Validators.required],
      stock: [data.entidad?.stock || 0, [Validators.required, Validators.min(0)]],
      imagen: [data.entidad?.imagen || null]
    });

    // Mostrar imagen previa si ya hay
    if (data.entidad?.imagen) {
      this.imagenPreview = data.entidad.imagen;
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.form.patchValue({ imagen: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
