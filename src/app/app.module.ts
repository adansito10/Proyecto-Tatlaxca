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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProductosComponent } from './dashboard/productos/productos.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { IngredientesComponent } from './dashboard/ingredientes/ingredientes.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ReportesComponent } from './dashboard/reportes/reportes.component';
import { InventarioComponent } from './dashboard/inventario/inventario.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { AgregarProductoComponent } from './dashboard/productos/modals/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './dashboard/productos/modals/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './dashboard/productos/modals/eliminar-producto/eliminar-producto.component';
import { VerIngredientesComponent } from './dashboard/productos/modals/ver-ingredientes/ver-ingredientes.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavigationComponent,
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
    MatInputModule,
    SharedModule
    
    
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
