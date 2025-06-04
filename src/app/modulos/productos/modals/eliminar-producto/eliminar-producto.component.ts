import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-producto',
  standalone: false,
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.scss'
})
export class EliminarProductoComponent {

constructor(
    public dialogRef: MatDialogRef<EliminarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
