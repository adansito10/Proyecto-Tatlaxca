import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  standalone: false,
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuarioForm = this.fb.group({
      nombre: [data.usuario?.nombre || '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidoPaterno: [data.usuario?.apellidoPaterno || '', Validators.required],
      apellidoMaterno: [data.usuario?.apellidoMaterno || '', Validators.required],
      id_rol: [this.obtenerIdRolPorNombre(data.usuario?.cargo), Validators.required],
      telefono: [data.usuario?.telefono || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: [data.usuario?.correo || '', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]] // opcional
    });
  }

  private obtenerIdRolPorNombre(cargoNombre: string): number | null {
    const rol = this.data.roles?.find((r: any) => r.rol === cargoNombre);
    return rol ? rol.id : null;
  }

  guardar(): void {
  if (this.usuarioForm.valid) {
    const formValue = this.usuarioForm.value;
    const user: any = {
      id: this.data.usuario.idUsuario || this.data.usuario.id_usuario,
      correo: formValue.correo,
      id_rol: formValue.id_rol,
    };

    if (formValue.password && formValue.password.trim().length >= 6) {
      user.password = formValue.password.trim();
    }

    const employee = {
      id: this.data.usuario.idEmpleado || this.data.usuario.id_empleado, 
      nombre: formValue.nombre,
      appaterno: formValue.apellidoPaterno,
      apmaterno: formValue.apellidoMaterno, 
      telefono: formValue.telefono
    };

    this.dialogRef.close({ user, employee });
  }
}



  eliminar(): void {
    this.dialogRef.close({ eliminar: true });
  }
}