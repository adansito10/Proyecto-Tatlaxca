import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AgregarProductoComponent } from './Productos/agregar-productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './Productos/editar-producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './Productos/eliminar-producto/eliminar-producto/eliminar-producto.component';
import { VerProductoComponent } from './Productos/ver-producto/ver-producto/ver-producto.component';
import { MostrarIngredientesComponent } from './Ingredientes/Mostrar-ingredientes/mostrar-ingredientes.component';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AgregarIngredienteComponent } from './Ingredientes/agregar-ingrediente/agregar-ingrediente.component';
import { EditarIngredienteComponent } from './Ingredientes/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from './Ingredientes/eliminar-ingrediente/eliminar-ingrediente.component';
import { AgregarSuministroComponent } from './Inventario/agregar-suministro/agregar-suministro.component';
import { EditarSuministroComponent } from './Inventario/editar-suministro/editar-suministro.component';
import { EliminarSuministroComponent } from './Inventario/eliminar-suministro/eliminar-suministro.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgregarUsuarioComponent } from './Usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './Usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './Usuarios/eliminar-usuario/eliminar-usuario.component';
import { ConfirmLogoutDialogComponent } from './confirm-logout-login/confirmLogoutDialogComponent';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MostrarInsumosComponent } from './Inventario/mostrar-insumos/mostrar.insumos.component';
import { AgregarCategoriesComponent } from './categories/agregar-categoria/agregar-categoria.component';
import { EliminarCategoryComponent } from './categories/eliminar-categoria/eliminar-categoria-component';
import { AgregarMesaComponent } from './tables/agregar-tables/agregar-mesa.component';
import { EliminarMesaComponent } from './tables/eliminar-tables/eliminar-mesa.component';
import { AgregarRolComponent } from './roles/agrega-rol/agrega-rol.component';
import { EliminarRolComponent } from './roles/eliminar-rol/eliminar-rol.component';
import { AgregarStatusComponent } from './status/agrega-status/agregar-status.component';
import { EliminarStatusComponent } from './status/eliminar-status/eliminar-status.component';
import { OrderDetailComponent } from './orders-detail/orders-detail.component';

@NgModule({
  declarations: [
  AgregarProductoComponent,
  EditarProductoComponent,
  EliminarProductoComponent,
  VerProductoComponent,
  MostrarIngredientesComponent,
  AgregarIngredienteComponent,
  EditarIngredienteComponent,
  EliminarIngredienteComponent,
  AgregarSuministroComponent,
  EditarSuministroComponent,
  EliminarSuministroComponent,
  AgregarUsuarioComponent,
  EditarUsuarioComponent,
  EliminarUsuarioComponent,
  ConfirmLogoutDialogComponent,
  MostrarInsumosComponent,
  AgregarCategoriesComponent,
  EliminarCategoryComponent, 
  AgregarMesaComponent,
  EliminarMesaComponent,
  AgregarRolComponent,
  EliminarRolComponent,
  AgregarStatusComponent,
  EliminarStatusComponent,
  OrderDetailComponent
  
  
  
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule

  ],
  exports: [

  ]
})
export class ModalModule { }