import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Insumo } from '../../../../services/supplies/supplies.service';

@Component({
  selector: 'app-agregar-suministro',
  standalone: false,
  templateUrl: './agregar-suministro.component.html',
  styleUrls: ['./agregar-suministro.component.scss']
})
export class AgregarSuministroComponent implements OnInit {
  suministroForm!: FormGroup;
  modo: 'agregar' | 'editar' = 'agregar';
  unidades: string[] = ['Unidades', 'Paquete'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarSuministroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'agregar' | 'editar', suministro?: Insumo }
  ) {}

  ngOnInit(): void {
    this.modo = this.data.modo || 'agregar';

    this.suministroForm = this.fb.group({
      nombre: [this.data.suministro?.nombre || '', [Validators.required, Validators.maxLength(40)]],
      unidad: [this.data.suministro?.unidad || '', Validators.required],
      stock: [this.data.suministro?.stock ?? 0, [Validators.required, Validators.min(0.01)]],
      es_desechable: [this.data.suministro?.es_desechable ?? false],  

    });
  }

guardar(): void {
  if (this.suministroForm.invalid) {
    this.suministroForm.markAllAsTouched();
    return;
  }

  const formValue = this.suministroForm.value;

  this.dialogRef.close(formValue);
}


  cancelar(): void {
    this.dialogRef.close();
  }
}
