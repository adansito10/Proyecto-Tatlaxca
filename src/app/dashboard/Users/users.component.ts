import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/Users/usuario-service.service';
import { RolesService } from '../../services/roles/roles.service';
import { EmployeesService } from '../../services/employees/employees-service';

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
    private empleadoService: EmployeesService,
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
      next: usuarios => {
        this.empleadoService.getEmpleados().subscribe({
          next: empleados => {
            this.usuarios = empleados.map(empleado => {
              const usuario = usuarios.find(u => u.id === empleado.id_usuario);
              const rol = this.roles.find(r => r.id === usuario?.id_rol)?.rol || 'Sin rol';

              return {
                ...empleado,
                idEmpleado: empleado.id,           
                apellidoPaterno: empleado.appaterno,
                apellidoMaterno: empleado.apmaterno,
                correo: usuario?.correo || 'Sin correo',
                cargo: rol
              };
            });
          },
          error: err => console.error('Error al obtener empleados:', err)
        });
      },
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

    this.empleadoService.crearEmpleado(resultado).subscribe({
      next: () => this.cargarUsuarios(),
      error: err => console.error('Error al crear usuario y empleado', err)
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
      const { user, employee } = resultado;

      this.empleadoService.editarEmpleado(usuario.idEmpleado, employee, user).subscribe({
        next: () => this.cargarUsuarios(),
        error: err => console.error('Error al editar empleado y usuario:', err)
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
