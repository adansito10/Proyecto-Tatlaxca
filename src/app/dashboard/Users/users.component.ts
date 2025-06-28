import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/Users/usuario-service.service';
import { RolesService } from '../../services/roles/roles.service';

import { AgregarUsuarioComponent } from '../../shared-modals/modals/Usuarios/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from '../../shared-modals/modals/Usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../../shared-modals/modals/Usuarios/eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  filtroCargo: string = '';
  cargos: string[] = [];
  roles: any[] = [];

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsersService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
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

  cargarRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: data => {
        this.roles = data;
        this.cargos = data.map((r: any) => r.rol);
      },
      error: err => console.error('Error al obtener roles:', err)
    });
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '600px',
      data: {
        modo: 'agregar',
        usuario: {},
        roles: this.roles
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;

      this.usuarioService.crearUsuario(resultado).subscribe({
        next: () => this.cargarUsuarios(),
        error: err => console.error('Error al crear usuario:', err)
      });
    });
  }

  abrirModalEditar(usuario: any): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '600px',
      data: {
        modo: 'editar',
        usuario: { ...usuario },
        roles: this.roles
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.usuarioService.editarUsuario(usuario.id, resultado).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => console.error('Error al editar usuario:', err)
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
