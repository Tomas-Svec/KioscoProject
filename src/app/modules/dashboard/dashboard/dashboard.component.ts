/* src/app/modules/dashboard/dashboard/dashboard.component.ts */

import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ManageStockComponent } from "../../manage-stock/manage-stock/manage-stock.component";
import { MatDialog } from '@angular/material/dialog';
import { RouteNavigatorService } from '../../../core/services/route-navigator.service';
import { BreakpointObserver } from '@angular/cdk/layout';



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
    public dialog: MatDialog,
    private routeNavigator: RouteNavigatorService,
    private breakpointObserver: BreakpointObserver
  ) {}

  
  openManageStockModal(): void {
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)'); // Detecta si es móvil

    const dialogConfig = {
      width: isMobile ? '95%' : '80%', // Ancho para móviles y escritorios
      height: isMobile ? '90%' : '80%', // Altura para móviles y escritorios
      maxWidth: isMobile ? 'none' : '1200px', // Máximo ancho (ninguno para móviles)
      maxHeight: isMobile ? 'none' : '90vh', // Máxima altura (ninguna para móviles)
      panelClass: 'custom-dialog-container', // Clase personalizada
    };

    this.dialog.open(ManageStockComponent, dialogConfig);
  }




  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }

  
}

