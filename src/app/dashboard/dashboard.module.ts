import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatOptionModule } from '@angular/material/core';

import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './Products/productos.component';
import { IngredientesComponent } from './Ingredients/ingredientes.component';
import { UsuariosComponent } from './Users/usuarios.component';
import { ReportesComponent } from './Reports/reportes.component';
import { InventarioComponent } from './Inventory/inventario.component';
import { ConfiguracionComponent } from './Configuration/configuracion.component';


import { OrdenesComponent } from './Orders/ordenes.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule } from '../shared/modales/modal.module';
import { HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    IngredientesComponent,
    UsuariosComponent,
    ReportesComponent,
    InventarioComponent,
    ConfiguracionComponent,
    OrdenesComponent,
 
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    DashboardRoutingModule,
    SharedModule,
    ModalModule,
    HttpClientJsonpModule
    
  ]
})
export class DashboardModule { }