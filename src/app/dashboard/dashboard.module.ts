import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared-modals/shared.module';
import { MatOptionModule } from '@angular/material/core';

import { InicioComponent } from './inicio/inicio.component';
import { ProductsComponent } from './Products/productos.component';
import { IngredientsComponent } from './Ingredients/ingredients.component';
import { UsersComponent } from './Users/users.component';
import { ReportsComponent } from './Reports/reports.component';
import { InventoryComponent } from './Inventory/inventory.component';
import { ConfigurationComponent } from './Configuration/configuration.component';


import { OrdersComponent } from './Orders/orders.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule } from '../shared-modals/modals/modal.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CategoriesComponent } from './categories/categories.component';
import { NgChartsModule } from 'ng2-charts';
import { AgregarMesaComponent } from '../shared-modals/modals/tables/agregar-tables/agregar-mesa.component';
import { TablesComponent } from './tables/tables.component';
import { RolesComponent } from './roles/roles.component';
import { StatusComponent } from './status/status.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    InicioComponent,
    ProductsComponent,
    IngredientsComponent,
    UsersComponent,
    ReportsComponent,
    InventoryComponent,
    ConfigurationComponent,
    OrdersComponent,
    CategoriesComponent,
    TablesComponent,
    RolesComponent,
    StatusComponent,

    

 
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    DashboardRoutingModule,
    SharedModule,
    ModalModule,
    HttpClientJsonpModule,
    NgChartsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
    MatProgressBarModule,

    
    
  ]
})
export class DashboardModule { }