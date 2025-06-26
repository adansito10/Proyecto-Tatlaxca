import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientsService } from '../../../../services/Ingredients/ingredients.service';

@Component({
  selector: 'app-mostrar-ingredientes',
  standalone: false,
  templateUrl: './mostrar-ingredientes.component.html',
  styleUrl: './mostrar-ingredientes.component.scss'
})
export class MostrarIngredientesComponent implements OnInit {
  ingredientesForm: FormGroup;
  controlNombres = ['ing1', 'ing2', 'ing3', 'ing4', 'ing5'];
  ingredientesDisponibles: { id: number, nombre: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MostrarIngredientesComponent>,
    private ingredientsService: IngredientsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const group: any = {};
    this.controlNombres.forEach(name => {
      group[name + '_nombre'] = [''];
      group[name + '_cantidad'] = [''];
    });
    this.ingredientesForm = this.fb.group(group);
  }

  ngOnInit(): void {
    this.ingredientsService.obtenerIngredientes().subscribe({
      next: (data) => {
        this.ingredientesDisponibles = data;
      },
      error: err => console.error('Error al cargar ingredientes', err)
    });
  }

  guardarIngredientes(): void {
    const values = this.ingredientesForm.value;
    const seleccionados = this.controlNombres.map(name => {
      const ing = values[name + '_nombre'];
      return {
        id: ing?.id,
        nombre: ing?.nombre,
        cantidad: values[name + '_cantidad']
      };
    }).filter(item => item.id && item.cantidad > 0);

    this.dialogRef.close(seleccionados);
  }
}
