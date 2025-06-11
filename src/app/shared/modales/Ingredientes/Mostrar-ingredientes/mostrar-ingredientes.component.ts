import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-mostrar-ingredientes',
  standalone: false,
  templateUrl: './mostrar-ingredientes.component.html',
  styleUrl: './mostrar-ingredientes.component.scss'
})
export class MostrarIngredientesComponent {

ingredientesForm: FormGroup;
  controlNombres = ['ing1', 'ing2', 'ing3', 'ing4', 'ing5'];

  // Simula ingredientes disponibles, puedes cargarlos desde un servicio también
  ingredientesDisponibles: string[] = [
    'Lechuga', 'Tomate', 'Queso', 'Jamón', 'Pan', 'Carne', 'Cebolla', 'Mayonesa'
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MostrarIngredientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const group: any = {};
    this.controlNombres.forEach(name => {
      group[name] = [''];
    });
    this.ingredientesForm = this.fb.group(group);
  }

  ngOnInit(): void {
    // Aquí podrías precargar ingredientes si viene algo en this.data
  }

  guardarIngredientes(): void {
    const seleccionados = Object.values(this.ingredientesForm.value)
      .filter(val => val !== '');

    this.dialogRef.close(seleccionados);
  }
}
