import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from '../layout/navigation/navigation.component'; 

import { InicioComponent } from './inicio/inicio.component';
import { ProductsComponent } from './menu/productos.component';
import { IngredientsComponent } from './Ingredients/ingredients.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './sales/sales.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { TablesComponent } from './tables/tables.component';
import { RolesComponent } from './roles/roles.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent, 
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'menu', component: ProductsComponent },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'status', component: StatusComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'sales', component: ReportsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'supplies', component: SuppliesComponent },
      { path: 'perfil', component: ConfigurationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
