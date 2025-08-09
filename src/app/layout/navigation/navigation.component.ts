import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../shared-modals/modals/confirm-logout-login/confirmLogoutDialogComponent';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { InsumosService } from '../../services/supplies/supplies.service';
import { IngredientsService } from '../../services/Ingredients/ingredients.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  notificaciones: { id: string; mensaje: string }[] = [];
  cantidadNotificaciones = 0;

  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private notificacionesService = inject(NotificacionesService);
  private insumosService = inject(InsumosService);
  private ingredientsService = inject(IngredientsService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isSideMode = false;
  sidenavOpened = true;
  cerrandoSesion = false;

  user: { correo: string; rol: string } | null = null;

  constructor() {
    this.isHandset$.subscribe((isHandset) => {
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

    this.notificacionesService.notificaciones$.subscribe((nots) => {
      this.notificaciones = nots;
      this.cantidadNotificaciones = nots.length;
    });

    this.revisarStockBajo();
  }

  limpiarNotificaciones() {
    this.notificacionesService.limpiarNotificaciones();
  }

revisarStockBajo() {
  const UMBRALES_POR_UNIDAD: Record<string, number> = {
    g: 100,
    ml: 500,
    u: 10,
  };

  forkJoin({
    insumos: this.insumosService.obtenerInsumos(),
    ingredientes: this.ingredientsService.obtenerIngredientes(),
  }).subscribe({
    next: ({ insumos, ingredientes }) => {

      insumos.forEach((i) => {
        const id = `insumo_${i.id}`;
        const umbral = 10; 

        if (i.stock >= 0 && i.stock < umbral) {
          this.notificacionesService.agregarNotificacion(
            id,
            `Insumo: ${i.nombre}\nStock bajo: ${i.stock} unidades`
          );
        } else {
          this.notificacionesService.eliminarNotificacionPorId(id);
        }
      });

      ingredientes.forEach((i) => {
        const unidad = i.unidad?.toLowerCase();
        const umbral = UMBRALES_POR_UNIDAD[unidad] ?? 10;
        const id = `ingrediente_${i.id}`;

        if (i.stock >= 0 && i.stock < umbral) {
          this.notificacionesService.agregarNotificacion(
            id,
            `Ingrediente: ${i.nombre}\nStock bajo: ${i.stock} ${i.unidad}`
          );
        } else {
          this.notificacionesService.eliminarNotificacionPorId(id);
        }
      });
    },
    error: (err) => {
      console.error('Error al obtener datos para notificaciones:', err);
    },
  });
}


  navegarAProducto(mensaje: string) {
    const esIngrediente = mensaje.includes('Ingrediente:');
    const esInsumo = mensaje.includes('Insumo:');

    const nombre = mensaje.split('\n')[0].split(':')[1]?.trim();

    if (esIngrediente) {
      this.router.navigate(['/dashboard/ingredients'], {
        queryParams: { nombre },
      });
    } else if (esInsumo) {
      this.router.navigate(['/dashboard/supplies'], {
        queryParams: { nombre },
      });
    }
  }

  onSidenavToggle(opened: boolean) {
    this.sidenavOpened = opened;
  }

  onLinkClick(drawer: any) {
    this.isHandset$
      .subscribe((isHandset) => {
        if (isHandset) {
          drawer.close();
        }
      })
      .unsubscribe();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
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
