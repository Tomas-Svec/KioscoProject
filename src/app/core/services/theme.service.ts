// src/app/core/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false); // Tema claro por defecto
  isDarkTheme$ = this.isDarkTheme.asObservable(); // Observable para suscribirse a cambios

  constructor() {}

  // Cambiar entre modo oscuro y claro
  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
  }

  // Obtener el estado actual del tema
  getCurrentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}