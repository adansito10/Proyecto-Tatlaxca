import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { ProductosComponent } from './dashboard/productos/productos.component';
import { IngredientesComponent } from './dashboard/ingredientes/ingredientes.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ReportesComponent } from './dashboard/reportes/reportes.component';
import { InventarioComponent } from './dashboard/inventario/inventario.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

   { 
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full'
    },
    { path: 'inicio', component: InicioComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'ingredientes', component: IngredientesComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule, ]
})
export class AppRoutingModule { }
