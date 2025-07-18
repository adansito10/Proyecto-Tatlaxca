import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared-modals/shared.module';
import { MatOptionModule } from '@angular/material/core';

import { InicioComponent } from './inicio/inicio.component';
import { ProductsComponent } from './menu/productos.component';
import { IngredientsComponent } from './Ingredients/ingredients.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './sales/sales.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { ConfigurationComponent } from './configuration/configuration.component';


import { OrdersComponent } from './orders/orders.component';
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
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    InicioComponent,
    ProductsComponent,
    IngredientsComponent,
    UsersComponent,
    ReportsComponent,
    SuppliesComponent,
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
    MatSortModule,
    MatProgressBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule

        

    
    
  ]
})
export class DashboardModule { }