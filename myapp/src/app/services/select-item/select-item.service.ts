import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectItemService {
  private datosSource = new BehaviorSubject(null);
  datosActuales = this.datosSource.asObservable();

  constructor() { }

  cambiarDatos(datos: any) {
    this.datosSource.next(datos);
  }
}
