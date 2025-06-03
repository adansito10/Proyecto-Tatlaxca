import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './modulos/productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './modulos/inicio/inicio.component';
import { IngredientesComponent } from './modulos/ingredientes/ingredientes.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { ReportesComponent } from './modulos/reportes/reportes.component'; 
import { InventarioComponent } from './modulos/inventario/inventario.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
const routes: Routes = [
  
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'inicio',    component: InicioComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'configuracion', component: ConfiguracionComponent },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule, ]
})
export class AppRoutingModule { }
