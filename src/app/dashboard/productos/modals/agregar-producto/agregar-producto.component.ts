import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-producto',
  standalone: false,
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export class AgregarProductoComponent {
 producto = {
    nombre: '',
    categoria: '',
    precio: 0,
    descripcion: ''
  };

  constructor(public dialogRef: MatDialogRef<AgregarProductoComponent>) {}

  
  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }

  
}


