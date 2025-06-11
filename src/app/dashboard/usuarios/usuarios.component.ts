import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from '../../shared/modales/Usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from '../../shared/modales/Usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../../shared/modales/Usuarios/eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  filtroCargo: string = '';
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
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '600px',
      data: {
        modo: 'agregar',
        usuario: {},
        cargos: this.cargos
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;
      resultado.id = '00' + (this.usuarios.length + 123);
      this.usuarios.push(resultado);
    });
  }

  abrirModalEditar(usuario: any) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '800px',
      data: {
        modo: 'editar',
        usuario: { ...usuario },
        cargos: this.cargos
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;
      const idx = this.usuarios.findIndex(p => p.id === usuario.id);
      if (idx !== -1) this.usuarios[idx] = resultado;
    });
  }

  abrirModalEliminar(usuario: any) {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '400px',
      data: {
        modo: 'eliminar',
        usuario
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado && resultado.eliminar) {
        this.usuarios = this.usuarios.filter(p => p.id !== usuario.id);
      }
    });
  }
}
