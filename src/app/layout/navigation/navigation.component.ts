import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../shared-modals/modals/confirm-logout-login/confirmLogoutDialogComponent';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private dialog = inject(MatDialog); // ✅ Faltaba esta línea


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isSideMode = false;
  sidenavOpened = true;

  cerrandoSesion = false; // 👉 Variable para mostrar el mensaje

  constructor() {
    this.isHandset$.subscribe(isHandset => {
      this.isSideMode = !isHandset;
      this.sidenavOpened = this.isSideMode;
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