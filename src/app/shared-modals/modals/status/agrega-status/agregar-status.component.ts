import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-form',
  standalone: false,
  templateUrl: './agregar-status.component.html',
  styleUrls: ['./agregar-status.component.scss']

})
export class AgregarStatusComponent implements OnInit {
  statusForm!: FormGroup;
  modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data?.modo || 'agregar';
  }

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      estado: [this.data?.entidad?.estado || '', Validators.required],
      descripcion: [this.data?.entidad?.descripcion || '']
    });
  }

  guardar(): void {
    if (this.statusForm.invalid) return;

    this.dialogRef.close(this.statusForm.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
