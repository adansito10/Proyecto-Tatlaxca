import { Component } from '@angular/core';
import { UsuarioModalComponent } from '../../shared/modals/usuario-modal/usuario-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configuracion',
  standalone: false,
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {
 usuario = {
    nombre: 'Adan',
    apellidoPaterno: 'Morales',
    apellidoMaterno: 'Capistran',
    telefono: '271 291 70 11',
    rol: 'Administrador',
    correo: 'Adandejesus12345@gmail.com'
  };

  guardarCambios() {
    console.log('Datos guardados:', this.usuario);
  }
}