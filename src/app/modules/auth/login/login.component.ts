
import { AuthService } from '../../../core/services/auth.service';
import { RouteNavigatorService } from '../../../core/services/route-navigator.service';
import { CommonModule, NgIf } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms';

// Importa los componentes app-header y app-button
import { HeaderComponent } from '../../../core/components/header/header.component';
import { ButtonComponent } from '../../../core/components/button/button.component';


import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    HeaderComponent, // Añade HeaderComponent aquí
    ButtonComponent  // Añade ButtonComponent aquí
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isDarkMode: boolean = false;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private routeNavigator: RouteNavigatorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el tema
    this.themeService.isDarkTheme$.subscribe((isDark) => {
      const theme = isDark ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
    });
  }

  onSubmit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.authService.saveUserData(response);
          this.routeNavigator.navigateToDashboard(); // Navega al dashboard
        },
        error: (error) => {
          this.errorMessage = 'Credenciales inválidas';
        }
      });
    } else {
      console.error('localStorage no está disponible en el servidor.');
    }
  }

  goToRegister(): void {
    this.routeNavigator.navigateToRegister(); // Navega al registro
  }
}