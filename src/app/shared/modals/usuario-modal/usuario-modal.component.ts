
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface UsuarioModalData {
  modo: 'agregar' | 'editar' | 'eliminar';
  usuario: {
    id?: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    cargo: string;
    telefono: string;
    foto?: string;
  };
  cargosDisponibles: string[];
}

@Component({
  selector: 'app-usuario-modal',
  standalone: false,
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModalData
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.usuario.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar(): void {
    if (!this.validarFormulario()) return;
    this.dialogRef.close(this.data.usuario);
  }

  eliminar(): void {
    this.dialogRef.close({ eliminar: true, id: this.data.usuario.id });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  private validarFormulario(): boolean {
    // Implementar validación según tus requisitos
    return !!this.data.usuario.nombre && !!this.data.usuario.cargo;
  }
}