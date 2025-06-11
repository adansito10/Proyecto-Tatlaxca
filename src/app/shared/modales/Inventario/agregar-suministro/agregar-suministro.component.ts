import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar-suministro',
  standalone: false,
  templateUrl: './agregar-suministro.component.html',
  styleUrls: ['./agregar-suministro.component.scss']
})
export class AgregarSuministroComponent {
  suministroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarSuministroComponent>,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dateAdapter.setLocale('es'); // Configura el idioma para el datepicker
    
    this.suministroForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      unidad: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      fechaUltimaCompra: [null],
      stockMinimo: [0, Validators.min(0)] // agregado
    });

    if (data?.suministro) {
      this.cargarDatosExistente(data.suministro);
    }
  }

  cargarDatosExistente(suministro: any): void {
    this.suministroForm.patchValue({
      nombre: suministro.nombre,
      categoria: suministro.categoria,
      unidad: suministro.unidad,
      stock: suministro.stock,
      fechaUltimaCompra: suministro.fechaUltimaCompra ? new Date(suministro.fechaUltimaCompra) : null,
      stockMinimo: suministro.stockMinimo ?? 0
    });
  }

  guardar(): void {
    if (this.suministroForm.valid) {
      const productoData = {
        ...this.suministroForm.value,
        fechaUltimaCompra: this.suministroForm.value.fechaUltimaCompra 
          ? this.suministroForm.value.fechaUltimaCompra.toISOString() 
          : null
      };
      this.dialogRef.close(productoData);
    }
  }
}
