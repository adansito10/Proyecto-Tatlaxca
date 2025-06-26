import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-suministro',
  standalone: false,
  templateUrl: './editar-suministro.component.html',
  styleUrl: './editar-suministro.component.scss'
})
export class EditarSuministroComponent {
modo: 'agregar' | 'editar';
  item: any;
  categorias: string[];

  constructor(
    public dialogRef: MatDialogRef<EditarSuministroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data.modo;
    this.item = {...data.item}; // Clonar para no modificar directamente el objeto original
    this.categorias = data.categorias;
  }

  guardar() {
    // Aquí puedes validar o procesar el formulario antes de cerrar
    this.dialogRef.close(this.item);
  }

  cancelar() {
    this.dialogRef.close();
  }
}