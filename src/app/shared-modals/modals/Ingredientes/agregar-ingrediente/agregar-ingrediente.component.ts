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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ingredienteForm = this.fb.group({
      nombre: [data.entidad?.nombre || '', Validators.required],
      unidad: [data.entidad?.unidad || '', Validators.required],
      stock: [data.entidad?.stock || 0, [Validators.required, Validators.min(0.01)]]
    });
  }

  guardarIngrediente(): void {
    if (this.ingredienteForm.invalid) return;

    const ingrediente = {
      ...this.ingredienteForm.value,
    };

    this.dialogRef.close(ingrediente);
  }
}
