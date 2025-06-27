import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-suministro',
  standalone: false,
  templateUrl: './agregar-suministro.component.html',
  styleUrls: ['./agregar-suministro.component.scss']
})
export class AgregarSuministroComponent {
  suministroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarSuministroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.suministroForm = this.fb.group({
      nombre: ['', Validators.required],
      unidad: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    if (data?.suministro) {
      this.cargarDatosExistente(data.suministro);
    }
  }

  cargarDatosExistente(suministro: any): void {
    this.suministroForm.patchValue({
      nombre: suministro.nombre,
      unidad: suministro.unidad,
      stock: suministro.stock
    });
  }

  guardar(): void {
    if (this.suministroForm.valid) {
      this.dialogRef.close(this.suministroForm.value);
    }
  }
}
