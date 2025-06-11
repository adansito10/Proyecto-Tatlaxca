import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-ingrediente',
  standalone: false,
  templateUrl: './eliminar-ingrediente.component.html',
  styleUrl: './eliminar-ingrediente.component.scss'
})
export class EliminarIngredienteComponent {
constructor(
    public dialogRef: MatDialogRef<EliminarIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombreProducto: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
