import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TablesService } from '../../../../services/tables/tables.service';

@Component({
  selector: 'app-eliminar-mesa',
  standalone: false,
  templateUrl: './eliminar-mesa.component.html'
})
export class EliminarMesaComponent {
  constructor(
    private dialogRef: MatDialogRef<EliminarMesaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, numero: number },
    private tablesService: TablesService
  ) {}

  confirmarEliminacion(): void {
    this.tablesService.eliminarMesa(this.data.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Error al eliminar mesa:', err)
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
