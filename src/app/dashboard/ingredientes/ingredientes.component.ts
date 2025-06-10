import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredienteModalComponent } from '../../shared/modals/ingrediente-modal/ingrediente-modal.component';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss'],
  standalone: false
})
export class IngredientesComponent {
  ingredientes = [
    { 
      id: '001', 
      nombre: 'Harina', 
      unidad: 'kg', 
      stock: 50,
      imagen: 'assets/images/harina.jpg' 
    },
    { 
      id: '002', 
      nombre: 'Azúcar', 
      unidad: 'kg', 
      stock: 30,
      imagen: 'assets/images/azucar.jpg' 
    },
  ];

  constructor(private dialog: MatDialog) {}

  abrirModalAgregar() {
    this.abrirModal('agregar', { 
      nombre: '',
      unidad: '',
      stock: 0,
      imagen: ''
    });
  }

  editarIngrediente(ingrediente: any) {
    this.abrirModal('editar', { ...ingrediente });
  }

  eliminarIngrediente(ingrediente: any) {
    this.abrirModal('eliminar', { ...ingrediente });
  }

  private abrirModal(modo: 'agregar' | 'editar' | 'eliminar', ingrediente: any) {
    const dialogRef = this.dialog.open(IngredienteModalComponent, {
      width: modo === 'eliminar' ? '400px' : '500px',
      data: { 
        modo: modo,
        entidad: ingrediente
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;

      switch(modo) {
        case 'agregar':
          resultado.id = '00' + (this.ingredientes.length + 1);
          this.ingredientes.push(resultado);
          break;
        case 'editar':
          const index = this.ingredientes.findIndex(i => i.id === ingrediente.id);
          if (index !== -1) this.ingredientes[index] = resultado;
          break;
        case 'eliminar':
          if (resultado.eliminar) {
            this.ingredientes = this.ingredientes.filter(i => i.id !== resultado.id);
          }
          break;
      }
    });
  }
}