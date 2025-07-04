import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-producto',
  standalone: false,
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss']
})
export class VerProductoComponent {
  constructor(
    public dialogRef: MatDialogRef<VerProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredientes: any[], insumos: any[] }
  ) {}
}
