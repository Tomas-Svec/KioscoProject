// src/app/core/components/header/header.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  // Alternar entre modo oscuro y claro
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Obtener el estado actual del tema
  get isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme();
  }
}