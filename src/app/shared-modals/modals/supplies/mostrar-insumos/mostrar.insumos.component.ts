import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsumosService, Insumo, InsumoSeleccionado } from '../../../../services/supplies/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mostrar-insumos',
  standalone: false,
  templateUrl: './mostrar-insumo.component.html',
  styleUrls: ['./mostrar-insumo.component.scss']
})
export class MostrarInsumosComponent implements OnInit {
  insumosForm: FormGroup;
  controlNombres: string[] = Array.from({ length: 20 }, (_, i) => `ins${i + 1}`);
  insumosDisponibles: Insumo[] = [];
  mensajeCantidadInvalida = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MostrarInsumosComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { insumosActuales: InsumoSeleccionado[] },
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
        this.insumosDisponibles = data.filter(ins => !ins.deleted_at);

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

  mostrarError(mensaje: string): void {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 4000,
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
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
    for (const name of this.controlNombres) {
      const ins = this.insumosForm.get(name + '_nombre')?.value as Insumo | null;
      const cantidad = this.insumosForm.get(name + '_cantidad')?.value;
      const cantidadControl = this.insumosForm.get(name + '_cantidad');

      if (ins && cantidadControl?.enabled && cantidad > 0 && !cantidadControl.errors) {
        return true;
      }

      if (!ins && (!cantidad || cantidad <= 0)) {
        cantidadControl?.setErrors(null);
      }
    }

    return this.insumosForm.valid;
  }

 guardarInsumos(): void {
  const values = this.insumosForm.value;
  const seleccionados: InsumoSeleccionado[] = [];
  let hayError = false;
  this.mensajeCantidadInvalida = false;

  this.controlNombres.forEach(name => {
    const ins = this.insumosForm.get(name + '_nombre')?.value as Insumo | null;
    const cantidadControl = this.insumosForm.get(name + '_cantidad');
    const cantidadRaw = values[name + '_cantidad'];
    const cantidad = Number(cantidadRaw);

    // ✅ Limpiar ceros iniciales
    if (/^0[0-9]+/.test(cantidadRaw)) {
      cantidadControl?.setErrors({ leadingZero: true });
      hayError = true;
      this.mostrarError(`La cantidad ingresada para "${ins?.nombre || 'un insumo'}" no puede tener ceros iniciales.`);
      return;
    }

    if (!ins && (!cantidad || cantidad <= 0)) {
      cantidadControl?.setErrors(null);
      return;
    }

    if (ins) {
      if (cantidad <= 0 || isNaN(cantidad)) {
        cantidadControl?.setErrors({ required: true });
        hayError = true;
        this.mostrarError(`La cantidad de "${ins.nombre}" debe ser mayor a cero.`);
        return;
      }

      if (cantidad > ins.stock) {
        cantidadControl?.setErrors({ excedeStock: true });
        hayError = true;
        this.mostrarError(`No hay suficiente stock de "${ins.nombre}". Máximo disponible: ${ins.stock}`);
        return;
      }

      cantidadControl?.setErrors(null);

      seleccionados.push({
        id: ins.id!,
        nombre: ins.nombre,
        unidad: ins.unidad,
        stock: ins.stock,
        cantidad
      });
    }
  });

  if (hayError) {
    this.mensajeCantidadInvalida = true;
    return;
  }

  this.mensajeCantidadInvalida = false;
  this.dialogRef.close(seleccionados);
}

  getInsumosDisponiblesPara(controlActual: string): Insumo[] {
    const seleccionados = this.controlNombres
      .filter(name => name !== controlActual)
      .map(name => this.insumosForm.get(name + '_nombre')?.value as Insumo | null)
      .filter(v => v !== null);

    return this.insumosDisponibles.filter(ins =>
      !seleccionados.some(sel => sel?.id === ins.id)
    );
  }

  getUnidad(control: string): string {
    const ins = this.insumosForm.get(control + '_nombre')?.value as Insumo | null;
    return ins?.unidad || '';
  }

  getStockMaximo(control: string): number {
    const ins = this.insumosForm.get(control + '_nombre')?.value as Insumo | null;
    return ins?.stock ?? Infinity;
  }
}
