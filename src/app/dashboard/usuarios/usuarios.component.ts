import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioModalComponent } from '../../shared/modals/usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  filtroCargo: string = '';
  mostrarFiltroCargo: boolean = false;

  cargos: string[] = ['Administrador', 'Gerente', 'Supervisor', 'Empleado', 'Cocinero', 'Mesero'];

  usuarios = [
    {
      id: '001',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
      cargo: 'Administrador',
      telefono: '5551234567',
      foto: 'assets/images/users/user1.jpg'
    },
    {
      id: '002',
      nombre: 'María',
      apellidoPaterno: 'López',
      apellidoMaterno: 'Hernández',
      cargo: 'Cocinero',
      telefono: '5557654321',
      foto: 'assets/images/users/user2.jpg'
    }
  ];

  constructor(private dialog: MatDialog) {}

  
  get usuariosFiltrados() {
    return this.usuarios.filter(usuario =>
      this.filtroCargo === '' || usuario.cargo === this.filtroCargo
    );
  }

  abrirModalAgregar() {
    this.abrirModal('agregar', {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      cargo: '',
      telefono: '',
      foto: ''
    });
  }

  abrirModalEditar(usuario: any) {
    this.abrirModal('editar', { ...usuario });
  }

  abrirModalEliminar(usuario: any) {
    this.abrirModal('eliminar', { ...usuario });
  }

  private abrirModal(modo: 'agregar' | 'editar' | 'eliminar', usuario: any) {
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      width: '600px',
      data: {
        modo: modo,
        usuario: usuario,
        cargos: this.cargos
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;

      switch (modo) {
        case 'agregar':
          resultado.id = '00' + (this.usuarios.length + 1);
          this.usuarios.push(resultado);
          break;
        case 'editar':
          const index = this.usuarios.findIndex(u => u.id === usuario.id);
          if (index !== -1) this.usuarios[index] = resultado;
          break;
        case 'eliminar':
          if (resultado.eliminar) {
            this.usuarios = this.usuarios.filter(u => u.id !== resultado.id);
          }
          break;
      }
    });
  }
}
