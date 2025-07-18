import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../shared-modals/modals/confirm-logout-login/confirmLogoutDialogComponent';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { InsumosService } from '../../services/supplies/supplies.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  notificaciones: string[] = [];
cantidadNotificaciones = 0;


  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificacionesService = inject(NotificacionesService);
  private insumosService = inject(InsumosService);



  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isSideMode = false;
  sidenavOpened = true;
  cerrandoSesion = false;

  user: { correo: string; rol: string } | null = null;

   constructor() {
    this.isHandset$.subscribe(isHandset => {
      this.isSideMode = !isHandset;
      this.sidenavOpened = this.isSideMode;
    });

    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        console.error('Error al parsear los datos del usuario:', e);
        this.user = null;
      }
    }

    this.notificacionesService.notificaciones$.subscribe(nots => {
      this.notificaciones = nots;
      this.revisarStockBajo();

      this.cantidadNotificaciones = nots.length;
    });
  }

  limpiarNotificaciones() {
    this.notificacionesService.limpiarNotificaciones();
  }


  revisarStockBajo() {
  this.insumosService.obtenerInsumos().subscribe({
    next: (data) => {
      const inventario = data.filter(i => i.stock !== -1);
      const bajos = inventario.filter(i => i.stock < 10);

      bajos.forEach(i => {
        const mensaje = `Stock bajo de ${i.nombre} - ${i.stock} unidades`;
        if (!this.notificacionesService.contiene(mensaje)) {
          this.notificacionesService.agregarNotificacion(mensaje);
        }
      });
    },
    error: (err) => {
      console.error('Error al obtener insumos desde Navigation', err);
    }
  });
}








  onSidenavToggle(opened: boolean) {
    this.sidenavOpened = opened;
  }

  onLinkClick(drawer: any) {
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        drawer.close();
      }
    }).unsubscribe();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cerrandoSesion = true;
        setTimeout(() => {
          localStorage.clear();
          this.router.navigate(['/auth/login']);
        }, 3000);
      }
    });
  }
}
