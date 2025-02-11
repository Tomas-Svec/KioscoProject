/* src/app/modules/dashboard/dashboard/dashboard.component.ts */

import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isDarkMode: boolean = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
  
  }

  ngOnInit(): void {
    // Suscribirse a cambios en el tema
    this.themeService.isDarkTheme$.subscribe((isDark) => {
      const theme = isDark ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}