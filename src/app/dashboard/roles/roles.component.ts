import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from '../../services/roles/roles.service';
import { AgregarRolComponent } from '../../shared-modals/modals/roles/agrega-rol/agrega-rol.component';
import { EliminarRolComponent } from '../../shared-modals/modals/roles/eliminar-rol/eliminar-rol.component';
import { Role } from '../../services/roles/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  filtro: string = '';

  constructor(
    private dialog: MatDialog,
    private rolesService: RolesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.filter((r) => !r.deleted_at);
      },
      error: (err) => console.error('Error al obtener roles:', err),
    });
  }

  get rolesFiltrados(): Role[] {
    const texto = this.filtro.toLowerCase().trim();
    return this.roles.filter(
      (r) =>
        r.rol.toLowerCase().includes(texto) ||
        (r.descripcion?.toLowerCase().includes(texto) ?? false)
    );
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(AgregarRolComponent, {
      width: '500px',
      data: { modo: 'agregar' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rolesService.crearRol(result).subscribe({
          next: () => {
            this.obtenerRoles();
            this.snackBar.open('Rol creado con éxito', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (err) => console.error('Error al crear rol:', err),
        });
      }
    });
  }

  abrirModalEditar(rol: Role): void {
    const dialogRef = this.dialog.open(AgregarRolComponent, {
      width: '500px',
      data: { modo: 'editar', entidad: rol },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rolesService.actualizarRol(rol.id, result).subscribe({
          next: () => {
            this.obtenerRoles();
            this.snackBar.open('Rol actualizado con éxito', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (err) => console.error('Error al actualizar rol:', err),
        });
      }
    });
  }

  abrirModalEliminar(rol: Role): void {
    const dialogRef = this.dialog.open(EliminarRolComponent, {
      width: '400px',
      data: { nombre: `Rol ${rol.rol}`, id: rol.id },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.rolesService.eliminarRol(rol.id).subscribe({
          next: () => {
            this.obtenerRoles();
            this.snackBar.open('Rol eliminado con éxito', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (err) => console.error('Error al eliminar rol', err),
        });
      }
    });
  }
}
