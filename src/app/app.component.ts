import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cafeteria-tatlaxca';

  constructor(
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.router.url;

        let pageTitle = 'Cafetería Tatiaxca';

        if (path.includes('/login')) {
          pageTitle = 'Inicio de Sesión - Cafetería Tatiaxca';
        } else if (path.includes('/dashboard/inicio')) {
         pageTitle = 'inicio - Cafetería Tatiaxca';
        } else if (path.includes('/dashboard/products')) {
          pageTitle = 'Menu - Cafetería Tatiaxca';
        } else if (path.includes('/dashboard/tables')) {
          pageTitle = 'Mesas - Cafetería Tatiaxca';
        } else if (path.includes('/dashboard/roles')) {
          pageTitle = 'Roles - Cafetería Tatiaxca';
        } else if (path.includes('/dashboard/status')) {
          pageTitle = 'Estados - Cafetería Tatiaxca';
        }

        this.titleService.setTitle(pageTitle);
      });
  }
}
