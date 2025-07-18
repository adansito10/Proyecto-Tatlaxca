import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  iniciandoSesion = false;
  mensajeError: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(event: Event) {
    event.preventDefault();

    const email = (document.querySelector('input[type=email]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type=password]') as HTMLInputElement).value;

    this.iniciandoSesion = true;
    this.mensajeError = null;

    this.authService.login(email, password).subscribe(ok => {
      if (ok) {
 setTimeout(() => {
      this.router.navigate(['/dashboard/inicio']);
    }, 1000); 
      } else {
        this.mostrarError('Acceso denegado. Solo los administradores pueden ingresar');
        this.iniciandoSesion = false;
      }
    }, error => {
      this.mostrarError('Error de conexión o credenciales inválidas');
      this.iniciandoSesion = false;
    });
  }

  private mostrarError(mensaje: string) {
    this.mensajeError = mensaje;
    setTimeout(() => this.mensajeError = null, 3000);
  }
}
