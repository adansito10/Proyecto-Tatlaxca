import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: false
})
export class NavigationComponent {
 private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isSideMode = false; 
  sidenavOpened = true; 

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
  }).unsubscribe(); // Cerramos la subscripción inmediatamente
}
}