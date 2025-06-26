import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-suministro',
  standalone: false,
  templateUrl: './eliminar-suministro.component.html',
  styleUrl: './eliminar-suministro.component.scss'
})
export class EliminarSuministroComponent {

 constructor(
    public dialogRef: MatDialogRef<EliminarSuministroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombreProducto: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
