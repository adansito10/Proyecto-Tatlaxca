import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarIngredienteComponent } from '../../shared/modales/Ingredientes/agregar-ingrediente/agregar-ingrediente.component';
import { AgregarSuministroComponent } from '../../shared/modales/Inventario/agregar-suministro/agregar-suministro.component';
import { EditarSuministroComponent } from '../../shared/modales/Inventario/editar-suministro/editar-suministro.component';
import { EliminarSuministroComponent } from '../../shared/modales/Inventario/eliminar-suministro/eliminar-suministro.component';
@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
 filtroTexto: string = '';
  filtroCategoria: string = '';
  
  categorias: string[] = ['Desechables', 'Limpieza', 'Bebidas', 'Alimentos', 'Equipo'];
  
  inventario = [
    {
      id: '00123',
      nombre: 'Vasos de cartón',
      categoria: 'Desechables',
      stock: 10,
      stockMinimo: 5,
      unidad: 'pieza',
      ultimaCompra: '14/05/2025',
      imagen: 'assets/images/vasos.jpg'
    },
    {
      id: '00124',
      nombre: 'Cucharas de plástico',
      categoria: 'Desechables',
      stock: 8,
      stockMinimo: 10,
      unidad: 'pieza',
      ultimaCompra: '14/05/2025',
      imagen: 'assets/images/cucharas.jpg'
    },
    {
      id: '00125',
      nombre: 'Servilletas blancas',
      categoria: 'Limpieza',
      stock: 15,
      stockMinimo: 8,
      unidad: 'paquetes',
      ultimaCompra: '14/05/2025',
      imagen: 'assets/images/servilletas.jpg'
    }
  ];

  constructor(private dialog: MatDialog) {}

  get inventarioFiltrado() {
    return this.inventario.filter(item => {
      const cumpleTexto = item.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()) || 
                         item.id.toLowerCase().includes(this.filtroTexto.toLowerCase());
      const cumpleCategoria = !this.filtroCategoria || item.categoria === this.filtroCategoria;
      return cumpleTexto && cumpleCategoria;
    });
  }

  abrirModalAgregar() {
    const dialogRef = this.dialog.open(AgregarSuministroComponent, {
      width: '600px',
      data: { 
        modo: 'agregar',
        item: {
          nombre: '',
          categoria: '',
          stock: 0,
          stockMinimo: 0,
          unidad: 'pieza',
          ultimaCompra: new Date().toLocaleDateString()
        },
        categorias: this.categorias
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        resultado.id = '00' + (this.inventario.length + 123);
        this.inventario.push(resultado);
      }
    });
  }

  abrirModalEditar(item: any) {
    const dialogRef = this.dialog.open(EditarSuministroComponent, {
      width: '600px',
      data: { 
        modo: 'editar',
        item: {...item},
        categorias: this.categorias
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        const index = this.inventario.findIndex(i => i.id === item.id);
        if (index !== -1) this.inventario[index] = resultado;
      }
    });
  }

  abrirModalEliminar(item: any) {
    const dialogRef = this.dialog.open(EliminarSuministroComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: `¿Estás seguro de eliminar el artículo ${item.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.inventario = this.inventario.filter(i => i.id !== item.id);
      }
    });
  }
}