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
  unidades: string[] = ['Kg', 'L', 'Unidad', 'Paquete'];

  constructor(
    public dialogRef: MatDialogRef<EditarSuministroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modo = data.modo;
    this.item = { ...data.item };
    this.categorias = data.categorias;
  }

  guardar(formulario: any) {
    if (formulario.valid) {
      this.dialogRef.close(this.item);
    } else {
      formulario.form.markAllAsTouched(); // muestra errores si no ha tocado campos
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
