import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


interface Notificacion {
  id: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificaciones: Map<string, Notificacion> = new Map();
  private notificacionesSource = new BehaviorSubject<Notificacion[]>([]);
  notificaciones$ = this.notificacionesSource.asObservable();

  agregarNotificacion(id: string, mensaje: string) {
    if (!this.notificaciones.has(id)) {
      this.notificaciones.set(id, { id, mensaje });
      this.actualizar();
    }
  }

  eliminarNotificacionPorId(id: string) {
    if (this.notificaciones.has(id)) {
      this.notificaciones.delete(id);
      this.actualizar();
    }
  }

  limpiarNotificaciones() {
    this.notificaciones.clear();
    this.actualizar();
  }

  private actualizar() {
    this.notificacionesSource.next(Array.from(this.notificaciones.values()));
  }
}
