import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-usuario',
  standalone: false,
  templateUrl: './eliminar-usuario.component.html',
  styleUrl: './eliminar-usuario.component.scss'
})
export class EliminarUsuarioComponent {
 constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}

