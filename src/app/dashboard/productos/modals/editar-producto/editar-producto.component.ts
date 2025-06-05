import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent {
constructor(
  public dialogRef: MatDialogRef<EditarProductoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
){}

guardar(){
  this.dialogRef.close(this.data);
}
cancelar() {
  this.dialogRef.close();

}
}
