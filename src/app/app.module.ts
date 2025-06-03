import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProductosComponent } from './modulos/productos/productos.component';
import { InicioComponent } from './modulos/inicio/inicio.component';
import { IngredientesComponent } from './modulos/ingredientes/ingredientes.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { ReportesComponent } from './modulos/reportes/reportes.component';
import { InventarioComponent } from './modulos/inventario/inventario.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { AgregarProductoComponent } from './modulos/productos/modals/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './modulos/productos/modals/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './modulos/productos/modals/eliminar-producto/eliminar-producto.component';
import { VerIngredientesComponent } from './modulos/productos/modals/ver-ingredientes/ver-ingredientes.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ProductosComponent,
    InicioComponent,
    IngredientesComponent,
    UsuariosComponent,
    ReportesComponent,
    InventarioComponent,
    ConfiguracionComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    VerIngredientesComponent,
    
   
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule, 
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
    
    
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
