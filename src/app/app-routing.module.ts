import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productos', component: ProductosComponent }
];
  // puedes añadir más rutas aquí


@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule, ]
})
export class AppRoutingModule { }
