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
import { AgregarIngredienteComponent } from './ingredientes/modals/agregar-ingrediente/agregar-ingrediente.component';
import { EditarIngredienteComponent } from './ingredientes/modals/editar-ingrediente/editar-ingrediente.component';
import { EliminarIngredienteComponent } from './ingredientes/modals/eliminar-ingrediente/eliminar-ingrediente.component';
import { AgregarUsuarioComponent } from './usuarios/modals/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/modals/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/modals/eliminar-usuario/eliminar-usuario.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { EditarOrdenComponent } from './ordenes/modals/editar-orden/editar-orden.component';
import { EliminarOrdenComponent } from './ordenes/modals/eliminar-orden/eliminar-orden.component';
import { EliminarSuministroComponent } from './inventario/modals/eliminar-suministro/eliminar-suministro.component';
import { EditarSuministroComponent } from './inventario/modals/editar-suministro/editar-suministro.component';
import { AgregarSuministroComponent } from './inventario/modals/agregar-suministro/agregar-suministro.component';
import { VerOrdenComponent } from './ordenes/modals/ver-orden/ver-orden.component';

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
    VerIngredientesComponent,
    AgregarIngredienteComponent,
    EditarIngredienteComponent,
    EliminarIngredienteComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
    OrdenesComponent,
    EditarOrdenComponent,
    EliminarOrdenComponent,
    EliminarSuministroComponent,
    EditarSuministroComponent,
    AgregarSuministroComponent,
    VerOrdenComponent,
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }