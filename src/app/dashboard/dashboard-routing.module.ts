import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { OrdenesComponent } from './ordenes/ordenes.component';

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