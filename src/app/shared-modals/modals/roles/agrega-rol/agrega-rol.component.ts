import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rol-form',
  standalone: false,
  templateUrl: './agregar-rol.component.html',
})
export class AgregarRolComponent implements OnInit {
  rolForm!: FormGroup;
  modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data?.modo || 'agregar';
  }

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      rol: [this.data?.entidad?.rol || '', Validators.required],
      descripcion: [this.data?.entidad?.descripcion || '']
    });
  }

  guardar(): void {
    if (this.rolForm.invalid) return;

    this.dialogRef.close(this.rolForm.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
