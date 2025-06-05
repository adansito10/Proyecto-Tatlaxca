import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-ingredientes',
  standalone: false,
  templateUrl: './ver-ingredientes.component.html',
  styleUrl: './ver-ingredientes.component.scss'
})
export class VerIngredientesComponent {
  constructor(
    public dialogRef: MatDialogRef<VerIngredientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
