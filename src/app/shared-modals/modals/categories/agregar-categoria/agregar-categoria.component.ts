import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../../../../services/categories/categories.service';

interface CategoriaModalData {
  modo: 'agregar' | 'editar';
  category?: Categoria;
}

@Component({
  selector: 'app-agregar-categories',
  standalone: false,
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss'] 
})
export class AgregarCategoriesComponent implements OnInit {
  form: FormGroup;
  modo: 'agregar' | 'editar';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaModalData
  ) {
    this.modo = data.modo;
    const cat = data.category || { nombre: '', descripcion: '' };
    this.form = this.fb.group({
      nombre: [cat.nombre, Validators.required],
      descripcion: [cat.descripcion]
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
