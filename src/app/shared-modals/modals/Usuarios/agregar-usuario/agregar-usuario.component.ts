import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  standalone: false,
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.scss'
})
export class AgregarUsuarioComponent {
  usuarioForm: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<AgregarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: string; usuario: any; cargos: string[] },
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [data.usuario.nombre || '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚÑñ ]+$')]],
      apellidoPaterno: [data.usuario.apellidoPaterno || '', Validators.required],
      apellidoMaterno: [data.usuario.apellidoMaterno || '', Validators.required],
      cargo: [data.usuario.cargo || '', Validators.required],
      telefono: [data.usuario.telefono || '', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      foto: [data.usuario.foto || ''],
      correo: [data.usuario.correo || '', [Validators.required, Validators.email]],
      password: [data.usuario.password || '', [Validators.required, Validators.minLength(6)]]
    });

    if (data.usuario.foto) {
      this.imagenPreview = data.usuario.foto;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenPreview = reader.result;
      this.usuarioForm.patchValue({ foto: reader.result });
    };

    reader.readAsDataURL(file);
  }

  guardar() {
    if (this.usuarioForm.invalid) return;
    this.dialogRef.close(this.usuarioForm.value);
  }

  eliminar() {
    this.dialogRef.close({ eliminar: true, id: this.data.usuario.id });
  }
}
