// users.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/Users/users.service';
import { RolesService } from '../../services/roles/roles.service';
import { EmployeesService } from '../../services/employees/employees-service';
import { ChangeDetectorRef } from '@angular/core';
import { AgregarUsuarioComponent } from '../../shared-modals/modals/users/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from '../../shared-modals/modals/users/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../../shared-modals/modals/users/eliminar-usuario/eliminar-usuario.component';

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
    private rolesService: RolesService,
    private cdr: ChangeDetectorRef,

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

  cargarRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: data => {
        this.roles = data;
        this.cargos = data.map((r: any) => r.rol);
      },
      error: err => console.error('Error al obtener roles', err)
    });
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
  const usuarioParaEditar = {
    idEmpleado: usuario.idEmpleado,
    idUsuario: usuario.idUsuario,
    nombre: usuario.nombre,
    apellidoPaterno: usuario.apellidoPaterno,
    apellidoMaterno: usuario.apellidoMaterno,
    telefono: usuario.telefono,
    correo: usuario.correo,
    cargo: usuario.cargo
  };

  const dialogRef = this.dialog.open(EditarUsuarioComponent, {
    width: '600px',
    data: {
      modo: 'editar',
      usuario: { ...usuarioParaEditar }, // copiado para no afectar el original hasta guardar
      roles: this.roles
    }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      const { user, employee } = resultado;

      if (!user.id) {
        console.error('ID de usuario faltante, cancelando edición');
        return;
      }

      const empleadoPayload = {
        id_usuario: user.id,
        nombre: employee.nombre,
        appaterno: employee.appaterno,
        apmaterno: employee.apmaterno,
        telefono: employee.telefono
      };

      this.empleadoService.editarEmpleado(usuarioParaEditar.idEmpleado, empleadoPayload, user).subscribe({
        next: (respuesta) => {
          const { employee: empActualizado, user: userActualizado } = respuesta;

          const rol = this.roles.find(r => r.id === userActualizado.id_rol)?.rol || 'Sin rol';

          // Actualizar directamente el objeto original en this.usuarios
          const index = this.usuarios.findIndex(u => u.idEmpleado === empActualizado.id);

          if (index !== -1) {
            this.usuarios[index] = {
              ...this.usuarios[index],
              nombre: empActualizado.nombre,
              apellidoPaterno: empActualizado.appaterno,
              apellidoMaterno: empActualizado.apmaterno,
              telefono: empActualizado.telefono,
              correo: userActualizado.correo,
              cargo: rol
            };

            // Forzar nueva referencia para que Angular detecte cambios en *ngFor
            this.usuarios = [...this.usuarios];
            this.cdr.detectChanges();  // <--- aquí forzamos actualización

          }
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
    if (resultado === true) { 
      this.usuarioService.eliminarUsuario(usuario.id).subscribe({
        next: () => this.cargarUsuarios(),
        error: err => console.error('Error al eliminar usuario', err)
      });
    }
  });
}
}