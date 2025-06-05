import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AgregarProductoComponent } from './productos/modals/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './productos/modals/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/modals/eliminar-producto/eliminar-producto.component';
import { VerIngredientesComponent } from './productos/modals/ver-ingredientes/ver-ingredientes.component';

@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    IngredientesComponent,
    UsuariosComponent,
    ReportesComponent,
    InventarioComponent,
    ConfiguracionComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    VerIngredientesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }