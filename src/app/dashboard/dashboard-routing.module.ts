import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from '../layout/navigation/navigation.component'; // layout principal

import { InicioComponent } from './inicio/inicio.component';
import { ProductsComponent } from './Products/productos.component';
import { IngredientsComponent } from './Ingredients/ingredients.component';
import { UsersComponent } from './Users/users.component';
import { ReportsComponent } from './Reports/reports.component';
import { InventoryComponent } from './Inventory/inventory.component';
import { ConfigurationComponent } from './Configuration/configuration.component';
import { OrdersComponent } from './Orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent, 
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'configuration', component: ConfigurationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
