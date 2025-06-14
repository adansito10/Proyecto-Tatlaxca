import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  standalone: false,
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {
  usuarioForm: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [data.usuario?.nombre || '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidoPaterno: [data.usuario?.apellidoPaterno || '', Validators.required],
      apellidoMaterno: [data.usuario?.apellidoMaterno || '', Validators.required],
      cargo: [data.usuario?.cargo || '', Validators.required],
      telefono: [data.usuario?.telefono || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: [data.usuario?.correo || '', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],  // campo vacío y opcional
      foto: [data.usuario?.foto || null]
    });

    if (data.usuario?.foto) {
      this.imagenPreview = data.usuario.foto;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
        this.usuarioForm.patchValue({ foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  guardar(): void {
    if (this.usuarioForm.valid) {
      const formValue = this.usuarioForm.value;

      // Eliminar el campo password si está vacío
      if (!formValue.password || formValue.password.trim() === '') {
        delete formValue.password;
      }

      this.dialogRef.close(formValue);
    }
  }

  eliminar(): void {
    this.dialogRef.close({ eliminar: true });
  }
}
