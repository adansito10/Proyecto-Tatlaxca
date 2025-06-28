import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  standalone: false,
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      modo: 'agregar' | 'editar' | 'eliminar';
      usuario: any;
      roles: { id: number; rol: string }[];
    }
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [data.usuario.nombre || '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidoPaterno: [data.usuario.apellidoPaterno || '', Validators.required],
      apellidoMaterno: [data.usuario.apellidoMaterno || '', Validators.required],
      id_rol: [data.usuario.id_rol ?? null, Validators.required],
      telefono: [data.usuario.telefono || '', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      correo: [data.usuario.correo || '', [Validators.required, Validators.email]],
      password: ['', data.modo === 'agregar' ? [Validators.required, Validators.minLength(6)] : []],
      foto: [data.usuario.foto || '']
    });

    if (data.usuario.foto) {
      this.imagenPreview = data.usuario.foto;
    }
  }

  ngOnInit(): void {
    if (this.data.modo === 'editar') {
      this.usuarioForm.get('password')?.clearValidators();
      this.usuarioForm.get('password')?.updateValueAndValidity();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result;
      this.usuarioForm.patchValue({ foto: reader.result });
    };
    reader.readAsDataURL(file);
  }

  guardar(): void {
    if (this.usuarioForm.invalid) return;

    const usuario = this.usuarioForm.value;
    if (this.data.modo === 'editar' && !usuario.password) {
      delete usuario.password; // Evitar sobrescribir si no se editó
    }

    this.dialogRef.close(usuario);
  }

  eliminar(): void {
    this.dialogRef.close({ eliminar: true, id: this.data.usuario.id });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
