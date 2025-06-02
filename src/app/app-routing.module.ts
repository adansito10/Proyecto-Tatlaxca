import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ReportesComponent } from './components/reportes/reportes.component'; 
import { InventarioComponent } from './components/inventario/inventario.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
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
