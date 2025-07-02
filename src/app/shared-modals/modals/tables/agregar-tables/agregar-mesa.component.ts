import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from '../../../../services/status/status.service';

@Component({
  selector: 'app-agregar-mesa',
  standalone: false,
  templateUrl: './agregar-mesa.component.html'
})
export class AgregarMesaComponent implements OnInit {
  mesaForm!: FormGroup;
  modo: 'agregar' | 'editar';
  estados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarMesaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private statusService: StatusService
  ) {
    this.modo = data?.modo || 'agregar';
  }

  ngOnInit(): void {
    const mesa = this.data?.entidad;

    this.mesaForm = this.fb.group({
      numero: [mesa?.numero || '', Validators.required],
      ubicacion: [mesa?.ubicacion || '', Validators.required],
      estado: [mesa?.estado || '', Validators.required]
    });

    this.cargarEstados();
  }

  cargarEstados(): void {
    this.statusService.obtenerStatus().subscribe({
      next: (data) => {
        this.estados = data.filter((e: any) => !e.deleted_at);
      },
      error: (err) => console.error('Error al cargar estados:', err)
    });
  }

  guardar(): void {
    if (this.mesaForm.invalid) return;
    const formData = this.mesaForm.value;
    this.dialogRef.close(formData); // Solo devuelve los datos
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
