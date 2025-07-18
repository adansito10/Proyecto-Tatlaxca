import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status, StatusService } from '../../../../services/status/status.service';
import { Table } from '../../../../services/tables/tables.service';

interface MesaDialogData {
  modo: 'agregar' | 'editar';
  entidad?: Table;
}

@Component({
  selector: 'app-agregar-mesa',
  standalone: false,
  templateUrl: './agregar-mesa.component.html',
  styleUrls: ['./agregar-mesa.component.scss']



})
export class AgregarMesaComponent implements OnInit {
  mesaForm!: FormGroup;
  readonly modo: 'agregar' | 'editar';
  estados: Status[] = [];
  errorMensaje = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarMesaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MesaDialogData,
    private statusService: StatusService
  ) {
    this.modo = data.modo;
  }

  ngOnInit(): void {
    const mesa = this.data.entidad;

    this.mesaForm = this.fb.group({
      numero: [mesa?.numero ?? '', [Validators.required]],
      ubicacion: [mesa?.ubicacion ?? '', [Validators.required]],
      estado: [mesa?.estado ?? '', [Validators.required]]
    });

    this.cargarEstados();
  }

  cargarEstados(): void {
    this.statusService.obtenerStatus().subscribe({
      next: (data) => {
        this.estados = data.filter((estado: Status) => !estado.deleted_at);
      },
      error: (err) => console.error('Error al cargar estados:', err)
    });
  }

  guardar(): void {
    if (this.mesaForm.invalid) {
      this.mesaForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.mesaForm.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
