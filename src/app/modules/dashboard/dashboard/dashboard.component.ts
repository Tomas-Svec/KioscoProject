/* src/app/modules/dashboard/dashboard/dashboard.component.ts */

import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ManageStockComponent } from "../../manage-stock/manage-stock/manage-stock.component";
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ManageStockComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isDarkMode: boolean = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  
  openManageStockModal(): void {
    this.dialog.open(ManageStockComponent, {
      width: '600px',
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }

  
}

