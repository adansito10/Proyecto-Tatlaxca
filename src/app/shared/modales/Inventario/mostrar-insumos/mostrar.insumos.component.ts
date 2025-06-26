import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsumosService } from '../../../../services/insumos/insumos.service';

@Component({
  selector: 'app-mostrar-insumos',
  standalone: false,
  templateUrl: './mostrar-insumo.component.html',
  styleUrls: ['./mostrar-insumo.component.scss']
})
export class MostrarInsumosComponent implements OnInit {
  insumosForm: FormGroup;
  controlNombres = ['ins1', 'ins2', 'ins3', 'ins4', 'ins5'];
  insumosDisponibles: { id: number, nombre: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MostrarInsumosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private insumosService: InsumosService
  ) {
    const group: any = {};
    this.controlNombres.forEach(name => {
      group[name + '_nombre'] = [''];
      group[name + '_cantidad'] = [''];
    });
    this.insumosForm = this.fb.group(group);
  }

  ngOnInit(): void {
    this.insumosService.obtenerInsumos().subscribe({
      next: (data) => {
        this.insumosDisponibles = data;
      },
      error: err => console.error('Error al cargar insumos:', err)
    });
  }

  guardarInsumos(): void {
    const values = this.insumosForm.value;
    const seleccionados = this.controlNombres.map(name => {
      const ins = values[name + '_nombre'];
      return {
        id: ins?.id,
        nombre: ins?.nombre,
        cantidad: values[name + '_cantidad']
      };
    }).filter(item => item.id && item.cantidad > 0);

    this.dialogRef.close(seleccionados);
  }
}
