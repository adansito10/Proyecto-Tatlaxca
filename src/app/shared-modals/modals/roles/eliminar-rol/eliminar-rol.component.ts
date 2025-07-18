import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-rol',
  standalone: false,
  templateUrl: './eliminar-rol.component.html',
  styleUrls: ['./eliminar-rol.component.scss']

})
export class EliminarRolComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string, id: number }
  ) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
