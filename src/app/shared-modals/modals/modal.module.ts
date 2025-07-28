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

import { AgregarProductoComponent } from './product/agregar-productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './product/editar-producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './product/eliminar-producto/eliminar-producto/eliminar-producto.component';
import { VerProductoComponent } from './product/ver-producto/ver-producto/ver-producto.component';
import { MostrarIngredientesComponent } from './ingredients/Mostrar-ingredientes/mostrar-ingredientes.component';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AgregarIngredienteComponent } from './ingredients/agregar-ingrediente/agregar-ingrediente.component';
import { EditarIngredienteComponent } from './ingredients/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from './ingredients/eliminar-ingrediente/eliminar-ingrediente.component';
import { AgregarSuministroComponent } from './supplies/agregar-suministro/agregar-suministro.component';
import { EliminarSuministroComponent } from './supplies/eliminar-suministro/eliminar-suministro.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgregarUsuarioComponent } from './users/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './users/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './users/eliminar-usuario/eliminar-usuario.component';
import { ConfirmLogoutDialogComponent } from './confirm-logout-login/confirmLogoutDialogComponent';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MostrarInsumosComponent } from './supplies/mostrar-insumos/mostrar.insumos.component';
import { AgregarCategoriesComponent } from './categories/agregar-categoria/agregar-categoria.component';
import { EliminarCategoryComponent } from './categories/eliminar-categoria/eliminar-categoria-component';
import { AgregarMesaComponent } from './tables/agregar-tables/agregar-mesa.component';
import { EliminarMesaComponent } from './tables/eliminar-tables/eliminar-mesa.component';
import { AgregarRolComponent } from './roles/agrega-rol/agrega-rol.component';
import { EliminarRolComponent } from './roles/eliminar-rol/eliminar-rol.component';
import { AgregarStatusComponent } from './status/agrega-status/agregar-status.component';
import { EliminarStatusComponent } from './status/eliminar-status/eliminar-status.component';
import { OrderDetailComponent } from './orders-detail/orders-detail.component';
import { CapitalizeDirective } from '../../directive/capitalize.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

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
  OrderDetailComponent,
  CapitalizeDirective
 
  
  
  
  
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
    ReactiveFormsModule,
    MatSnackBarModule, 
    MatRadioModule,



  ],
  exports: [

  ]
})
export class ModalModule { }