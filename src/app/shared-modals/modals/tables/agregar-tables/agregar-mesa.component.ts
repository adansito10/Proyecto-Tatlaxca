import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from '../../../../services/tables/tables.service';

interface MesaDialogData {
  modo: 'agregar' | 'editar';
  entidad?: Table;
}

@Component({
  selector: 'app-agregar-mesa',
  standalone: false,
  templateUrl: './agregar-mesa.component.html',
  styleUrls: ['./agregar-mesa.component.scss']
})
export class AgregarMesaComponent implements OnInit {
  mesaForm!: FormGroup;
  readonly modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarMesaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MesaDialogData,
  ) {
    this.modo = data.modo;
  }

  ngOnInit(): void {
    const mesa = this.data.entidad;

    if (this.modo === 'agregar') {
      this.mesaForm = this.fb.group({
        numero: ['', [Validators.required]],
        ubicacion: ['', [Validators.required]],
      });
    } else {
      this.mesaForm = this.fb.group({
        numero: [{ value: mesa?.numero ?? '', disabled: true }],
        ubicacion: [mesa?.ubicacion ?? '', [Validators.required]],
      });
    }
  }

guardar(): void {
  if (this.mesaForm.invalid) {
    this.mesaForm.markAllAsTouched();
    return;
  }

  const formValue = this.mesaForm.getRawValue();

  formValue.estado = 'Desocupado';

  this.dialogRef.close(formValue);
}

  cancelar(): void {
    this.dialogRef.close();
  }
}
