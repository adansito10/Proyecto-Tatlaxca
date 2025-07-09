import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsumosService } from '../../../../services/supplies/supplies.service';

@Component({
  selector: 'app-mostrar-insumos',
  standalone: false,
  templateUrl: './mostrar-insumo.component.html',
  styleUrls: ['./mostrar-insumo.component.scss']
})
export class MostrarInsumosComponent implements OnInit {
  insumosForm: FormGroup;
  controlNombres: string[] = Array.from({ length: 20 }, (_, i) => `ins${i + 1}`);
  insumosDisponibles: { id: number, nombre: string }[] = [];
  mensajeCantidadInvalida = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MostrarInsumosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { insumosActuales: any[] },
    private insumosService: InsumosService
  ) {
    const group: any = {};
    this.controlNombres.forEach(name => {
      group[name + '_nombre'] = [null];
      group[name + '_cantidad'] = [{ value: '', disabled: true }, [Validators.min(1)]];
    });
    this.insumosForm = this.fb.group(group);
  }

  ngOnInit(): void {
    this.insumosService.obtenerInsumos().subscribe({
      next: (data) => {
        this.insumosDisponibles = data;

        this.data.insumosActuales?.forEach((insumo, index) => {
          if (index < this.controlNombres.length) {
            const control = this.controlNombres[index];
            const encontrado = this.insumosDisponibles.find(i => i.id === insumo.id);
            if (encontrado) {
              this.insumosForm.get(control + '_nombre')?.setValue(encontrado);
              this.insumosForm.get(control + '_cantidad')?.setValue(insumo.cantidad);
              this.insumosForm.get(control + '_cantidad')?.enable();
            }
          }
        });

        this.escucharCambios();
      },
      error: err => console.error('Error al cargar insumos:', err)
    });
  }

  escucharCambios(): void {
    this.controlNombres.forEach(control => {
      this.insumosForm.get(control + '_nombre')?.valueChanges.subscribe(value => {
        const cantidadControl = this.insumosForm.get(control + '_cantidad');
        if (!value) {
          cantidadControl?.setValue('');
          cantidadControl?.disable();
          cantidadControl?.setErrors(null);
        } else {
          cantidadControl?.enable();
        }
      });
    });
  }

  puedeGuardar(): boolean {
    let valido = false;
    for (const name of this.controlNombres) {
      const ins = this.insumosForm.get(name + '_nombre')?.value;
      const cantidad = this.insumosForm.get(name + '_cantidad')?.value;
      const cantidadControl = this.insumosForm.get(name + '_cantidad');

      if (ins && cantidadControl?.enabled && cantidad > 0 && !cantidadControl.errors) {
        valido = true;
      }
    }
    return this.insumosForm.valid && valido;
  }

  guardarInsumos(): void {
    const values = this.insumosForm.value;
    const seleccionados: any[] = [];
    let hayError = false;
    this.mensajeCantidadInvalida = false;

    this.controlNombres.forEach(name => {
      const ins = values[name + '_nombre'];
      const cantidadControl = this.insumosForm.get(name + '_cantidad');
      const cantidad = Number(values[name + '_cantidad']) || 0;

      if (!ins && (!cantidad || cantidad <= 0)) {
        cantidadControl?.setErrors(null);
        return;
      }

      if (ins && (cantidad <= 0 || cantidad === null || isNaN(cantidad))) {
        cantidadControl?.setErrors({ required: true });
        hayError = true;
        return;
      }

      if (ins && cantidad > 0) {
        seleccionados.push({
          id: ins.id,
          nombre: ins.nombre,
          cantidad
        });
      }
    });

    if (hayError || seleccionados.length === 0 || this.insumosForm.invalid) {
      this.mensajeCantidadInvalida = true;
      return;
    }

    this.mensajeCantidadInvalida = false;
    this.dialogRef.close(seleccionados);
  }

  getInsumosDisponiblesPara(controlActual: string): any[] {
  const seleccionados = this.controlNombres
    .filter(name => name !== controlActual)
    .map(name => this.insumosForm.get(name + '_nombre')?.value)
    .filter(v => v);

  return this.insumosDisponibles.filter(ins =>
    !seleccionados.some(sel => sel.id === ins.id)
  );
}

}
