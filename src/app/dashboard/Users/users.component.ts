import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/Users/users.service';
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
  busquedaNombre: string = '';
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
    (this.filtroCargo === '' || usuario.cargo === this.filtroCargo) &&
    (this.busquedaNombre === '' || usuario.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase()))
  );
}




 cargarUsuarios(): void {
  this.empleadoService.getEmpleados().subscribe({
    next: empleados => {
      this.usuarios = empleados.map(empleado => ({
        ...empleado,
        idEmpleado: empleado.id,
        idUsuario: empleado.id_usuario,
        apellidoPaterno: empleado.appaterno,
        apellidoMaterno: empleado.apmaterno,
        correo: empleado.correo,
        cargo: empleado.rol
      }));
    },
    error: err => console.error('Error al obtener empleados', err)
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
      error: err => console.error('Error al crear empleado', err)
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
      let { user, employee } = resultado;

      const empleadoPayload = {
        id_usuario: usuario.idUsuario || usuario.id_usuario,
        nombre: employee.nombre,
        appaterno: employee.appaterno,
        apmaterno: employee.apmaterno,
        telefono: employee.telefono
      };

      this.empleadoService.editarEmpleado(usuario.idEmpleado, empleadoPayload, user).subscribe({
        next: (respuesta) => {
          const { employee: empActualizado, user: userActualizado } = respuesta;
          const rol = this.roles.find(r => r.id === userActualizado.id_rol)?.rol || 'Sin rol';

          this.usuarios = this.usuarios.map(u =>
            u.idEmpleado === empActualizado.id
              ? {
                  ...u,
                  nombre: empActualizado.nombre,
                  apellidoPaterno: empActualizado.appaterno,
                  apellidoMaterno: empActualizado.apmaterno,
                  telefono: empActualizado.telefono,
                  correo: userActualizado.correo,
                  cargo: rol
                }
              : u
          );
        },
        error: err => console.error('Error al editar empleado', err)
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