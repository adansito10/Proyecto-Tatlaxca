import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-status',
  standalone: false,
  templateUrl: './eliminar-status.component.html'
})
export class EliminarStatusComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string, id: number }
  ) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
