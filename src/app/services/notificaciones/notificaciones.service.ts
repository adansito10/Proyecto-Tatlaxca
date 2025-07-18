import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificacionesSource = new BehaviorSubject<string[]>([]);
  notificaciones$ = this.notificacionesSource.asObservable();

  private notificaciones: string[] = [];

  agregarNotificacion(mensaje: string) {
    this.notificaciones.push(mensaje);
    this.notificacionesSource.next(this.notificaciones);
  }

  limpiarNotificaciones() {
    this.notificaciones = [];
    this.notificacionesSource.next(this.notificaciones);
  }

  contiene(mensaje: string): boolean {
  return this.notificaciones.includes(mensaje);
}

eliminarNotificacionPorNombre(nombre: string) {
  this.notificaciones = this.notificaciones.filter(msg => !msg.includes(nombre));
  this.notificacionesSource.next(this.notificaciones);
}


}
