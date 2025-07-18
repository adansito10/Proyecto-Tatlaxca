import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { EmployeesService } from '../../services/employees/employees-service';

@Component({
  selector: 'app-configuration',
  standalone: false,
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
  
})
export class ConfigurationComponent implements OnInit {
  usuario: any = null;

  constructor(
    private authService: AuthService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (user && user.correo) {
      this.employeesService.getEmpleados().subscribe({
        next: (empleados) => {
          this.usuario = empleados.find(emp => emp.correo === user.correo) || null;
        },
        error: (err) => {
          console.error('Error al obtener empleados', err);
          this.usuario = null;
        }
      });
    }
  }
}
