import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioServiceService } from '../../services/Users-service/usuario-service.service';
import { AgregarUsuarioComponent } from '../../shared/modales/Usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from '../../shared/modales/Usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../../shared/modales/Usuarios/eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filtroCargo: string = '';
  cargos: string[] = [ 'Empleado', 'Cocinero', 'Mesero'];

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioServiceService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(usuario =>
      this.filtroCargo === '' || usuario.cargo === this.filtroCargo
    );
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error('Error al obtener usuarios:', err)
    });
  }

  abrirModalAgregar(): void {
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

    const datosAPI = {
      correo: resultado.correo,
      password: resultado.password
    };

    this.usuarioService.crearUsuario(datosAPI).subscribe({
      next: (apiResponse) => {
        const usuarioLocal = {
          correo: resultado.correo,
          nombre: resultado.nombre || '',
          apellidoPaterno: resultado.apellidoPaterno || '',
          apellidoMaterno: resultado.apellidoMaterno || '',
          telefono: resultado.telefono || '',
          foto: resultado.foto || '',
          cargo: resultado.cargo || ''
        };

        this.usuarios.push(usuarioLocal);
      },
      error: err => console.error('Error al crear usuario', err)
    });
  });
}


  abrirModalEditar(usuario: any): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '800px',
      data: {
        modo: 'editar',
        usuario: { ...usuario },
        cargos: this.cargos
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.usuarioService.editarUsuario(usuario.id, resultado).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => console.error('Error al editar usuario', err)
        });
      }
    });
  }

  abrirModalEliminar(usuario: any): void {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '400px',
      data: {
        modo: 'eliminar',
        usuario
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado?.eliminar) {
        this.usuarioService.eliminarUsuario(usuario.id).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => console.error('Error al eliminar usuario:', err)
        });
      }
    });
  }
}
