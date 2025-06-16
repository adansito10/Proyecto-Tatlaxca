import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './Products/productos.component';
import { IngredientesComponent } from './Ingredients/ingredientes.component';
import { UsuariosComponent } from './Users/usuarios.component';
import { ReportesComponent } from './Reports/reportes.component';
import { InventarioComponent } from './Inventory/inventario.component';
import { ConfiguracionComponent } from './Configuration/configuracion.component';
import { OrdenesComponent } from './Orders/ordenes.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'configuracion', component: ConfiguracionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }