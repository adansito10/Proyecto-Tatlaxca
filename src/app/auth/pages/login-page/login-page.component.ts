import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  iniciandoSesion = false;

  constructor(private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();

    this.iniciandoSesion = true;

    setTimeout(() => {
      this.router.navigate(['/dashboard/inicio']);
    }, 3000); 
  }
}
