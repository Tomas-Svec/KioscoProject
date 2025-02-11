/* src/app/modules/dashboard/dashboard/dashboard.component.ts */

import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import {app-sale-hostory} from '../../../modules/sale-hostory/sale-hostory.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [app-sale-hostory],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isDarkMode: boolean = false;

  constructor(
    private authService: AuthService,
  ) {
  
  }

 

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}