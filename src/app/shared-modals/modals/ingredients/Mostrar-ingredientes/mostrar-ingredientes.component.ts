import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientsService } from '../../../../services/Ingredients/ingredients.service';
import { Ingrediente } from '../../../../services/Ingredients/ingredients.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mostrar-ingredientes',
  standalone: false,
  templateUrl: './mostrar-ingredientes.component.html',
  styleUrl: './mostrar-ingredientes.component.scss'
})
export class MostrarIngredientesComponent implements OnInit {
  ingredientesForm: FormGroup;
  controlNombres: string[] = Array.from({ length: 20 }, (_, i) => `ing${i + 1}`);
  ingredientesDisponibles: Ingrediente[] = [];
  mensajeStockExcedido = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MostrarIngredientesComponent>,
    private ingredientsService: IngredientsService,
    private snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: { ingredientesActuales: Ingrediente[] }


  ) {
    const group: any = {};
    this.controlNombres.forEach(name => {
      group[name + '_nombre'] = [null];
      group[name + '_cantidad'] = [{ value: '', disabled: true }, [Validators.min(1)]];
    });
    this.ingredientesForm = this.fb.group(group);
  }

 ngOnInit(): void {
  this.ingredientsService.obtenerIngredientes().subscribe({
    next: (data) => {
    
      this.ingredientesDisponibles = data.filter(i => !i.deleted_at);

      this.data.ingredientesActuales?.forEach((ing, index) => {
        if (index < this.controlNombres.length) {
          const control = this.controlNombres[index];
          const encontrado = this.ingredientesDisponibles.find(i => i.id === ing.id);
          if (encontrado) {
            this.ingredientesForm.get(control + '_nombre')?.setValue(encontrado);
            this.ingredientesForm.get(control + '_cantidad')?.setValue(ing.cantidad);
            this.ingredientesForm.get(control + '_cantidad')?.enable();
          }
        }
      });

      this.escucharCambios();
    },
    error: err => console.error('Error al cargar ingredientes', err)
  });
}


  escucharCambios(): void {
    this.controlNombres.forEach(control => {
      this.ingredientesForm.get(control + '_nombre')?.valueChanges.subscribe(value => {
        const cantidadControl = this.ingredientesForm.get(control + '_cantidad');
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


  getIngredientesDisponiblesPara(controlActual: string): Ingrediente[] {
  const seleccionados = this.controlNombres
    .filter(name => name !== controlActual)
    .map(name => this.ingredientesForm.get(name + '_nombre')?.value)
    .filter(v => v); 

  return this.ingredientesDisponibles.filter(ing =>
    !seleccionados.some(sel => sel.id === ing.id)
  );
}

  getUnidad(control: string): string {
    const ing = this.ingredientesForm.get(control + '_nombre')?.value;
    return ing?.unidad || '';
  }

  getStockMaximo(control: string): number {
    const ing = this.ingredientesForm.get(control + '_nombre')?.value;
    return ing?.stock ?? Infinity;
  }

puedeGuardar(): boolean {
  let hayAlgunoValido = false;

  for (const name of this.controlNombres) {
    const ing = this.ingredientesForm.get(name + '_nombre')?.value;
    const cantidad = this.ingredientesForm.get(name + '_cantidad')?.value;
    const cantidadControl = this.ingredientesForm.get(name + '_cantidad');

    if (ing && cantidadControl?.enabled && cantidad > 0 && cantidad <= ing.stock && !cantidadControl.errors) {
      hayAlgunoValido = true;
    }

    if (!ing && (!cantidad || cantidad <= 0)) {
      cantidadControl?.setErrors(null);
    }
  }

  return this.ingredientesForm.valid;
}


mostrarError(mensaje: string): void {
  console.log('MOSTRANDO ERROR:', mensaje); 
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 4000,
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  });
}



  guardarIngredientes(): void {
  const values = this.ingredientesForm.value;
  const seleccionados: any[] = [];
  let hayError = false;
  this.mensajeStockExcedido = false;

  this.controlNombres.forEach(name => {
    const ing = values[name + '_nombre'];
    const cantidadControl = this.ingredientesForm.get(name + '_cantidad');
    const cantidadRaw = values[name + '_cantidad'];
    const cantidad = Number(cantidadRaw);

    if (!ing && (!cantidad || cantidad <= 0)) {
      cantidadControl?.setErrors(null);
      return;
    }

    if (/^0[0-9]+/.test(cantidadRaw)) {
      cantidadControl?.setErrors({ leadingZero: true });
      hayError = true;
      this.mostrarError(`La cantidad de "${ing?.nombre || 'un ingrediente'}" no puede comenzar con 0.`);
      return;
    }

    if (ing && (cantidad <= 0 || isNaN(cantidad))) {
      cantidadControl?.setErrors({ required: true });
      hayError = true;
      this.mostrarError(`La cantidad de "${ing.nombre}" debe ser mayor a cero.`);
      return;
    }

    if (cantidad > ing.stock) {
      cantidadControl?.setErrors({ excedeStock: true });
      hayError = true;
      this.mensajeStockExcedido = true;
      this.mostrarError(`Stock insuficiente para "${ing.nombre}". Máximo disponible: ${ing.stock}`);
      return;
    }

    cantidadControl?.setErrors(null);

    seleccionados.push({
      id: ing.id,
      nombre: ing.nombre,
      unidad: ing.unidad,
      cantidad
    });
  });

  if (hayError) {
    return;
  }

  this.mensajeStockExcedido = false;
  this.dialogRef.close(seleccionados);
}
}