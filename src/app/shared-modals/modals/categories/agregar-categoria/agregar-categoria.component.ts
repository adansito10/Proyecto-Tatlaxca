import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-categories',
  standalone: false,
  templateUrl: './agregar-categoria.component.html',
  styleUrl: './agregar-categoria.component.scss'

})
export class AgregarCategoriesComponent implements OnInit {
  form: FormGroup;
  modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data.modo;
    this.form = this.fb.group({
      nombre: [data.category?.nombre || '', Validators.required],
      descripcion: [data.category?.descripcion || '']
    });
  }

  ngOnInit(): void {}

  guardar(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
