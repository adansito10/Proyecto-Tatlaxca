import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

// Componentes
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { ProductoModalComponent } from './producto-modal/producto-modal.component';
import { IngredienteModalComponent } from './ingrediente-modal/ingrediente-modal.component';

@NgModule({
  declarations: [
    UsuarioModalComponent,
    IngredienteModalComponent,
    ProductoModalComponent
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [
    UsuarioModalComponent,
    ProductoModalComponent,
    IngredienteModalComponent
  ]
})
export class ModalModule { }