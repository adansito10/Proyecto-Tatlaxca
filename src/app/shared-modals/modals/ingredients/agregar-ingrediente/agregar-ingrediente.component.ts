import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingrediente } from '../../../../services/Ingredients/ingredients.service';

@Component({
  selector: 'app-agregar-ingrediente',
  standalone: false,
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.scss']
})
export class AgregarIngredienteComponent {
  ingredienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'agregar'| 'editar', entidad?: Ingrediente }
  ) {
    this.ingredienteForm = this.fb.group({
      nombre: [data.entidad?.nombre || '', Validators.required],
      unidad: [data.entidad?.unidad || '', Validators.required],
      stock: [data.entidad?.stock ?? 0, [Validators.required, Validators.min(0.01)]]
    });
  }

  guardarIngrediente(): void {
    if (this.ingredienteForm.invalid) return;
    this.dialogRef.close(this.ingredienteForm.value);
  }
} 