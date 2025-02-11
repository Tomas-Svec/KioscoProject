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
    this.isDarkMode = this.themeService.getTheme() === 'dark';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}