import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  iniciandoSesion = false;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(event: Event) {
    event.preventDefault();

    const email = (document.querySelector('input[type=email]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type=password]') as HTMLInputElement).value;

    this.iniciandoSesion = true;

    this.authService.login(email, password).subscribe(ok => {
      if (ok) {
        this.router.navigate(['/dashboard/inicio']);
      } else {
        alert('Credenciales incorrectas');
        this.iniciandoSesion = false;
      }
    });
  }
}