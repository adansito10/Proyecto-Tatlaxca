import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-categories',
  standalone: false,
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.scss'] 

})
export class EliminarCategoryComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}