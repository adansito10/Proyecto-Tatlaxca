import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Ingrediente {
  nombre: string;
  unidad: string;
  stock: number;
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

    this.form = this.fb.group({
      nombre: [data.entidad?.nombre || '', Validators.required],
      unidad: [data.entidad?.unidad || '', Validators.required],
      stock: [data.entidad?.stock || 0, [Validators.required, Validators.min(0)]],
    });
   
  }

  ngOnInit(): void {}


  guardar(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
