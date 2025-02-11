import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'light'; // Tema predeterminado

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.currentTheme = savedTheme || 'light';
      this.applyTheme(this.currentTheme);
    }
  }

  // Método para alternar entre temas
  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.currentTheme); // Guarda el tema en localStorage
    }
  }

  // Método privado para aplicar el tema
  private applyTheme(theme: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = theme; // Aplica la clase al body
    }
  }

  // Método para obtener el tema actual
  getTheme(): string {
    return this.currentTheme;
  }
}