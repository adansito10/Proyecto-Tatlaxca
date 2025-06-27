import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-suministro',
  standalone: false,
  templateUrl: './editar-suministro.component.html',
  styleUrls: ['./editar-suministro.component.scss']
})
export class EditarSuministroComponent {
  modo: 'agregar' | 'editar';
  item: any;
  categorias: string[];
  unidades: string[] = ['Kg', 'L', 'Unidad', 'Paquete']; // 👈 Aquí defines las opciones del select

  constructor(
    public dialogRef: MatDialogRef<EditarSuministroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data.modo;
    this.item = { ...data.item };
    this.categorias = data.categorias;
  }

  guardar() {
    this.dialogRef.close(this.item);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
