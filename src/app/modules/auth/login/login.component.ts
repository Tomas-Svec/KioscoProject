import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouteNavigatorService } from '../../../core/services/route-navigator.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private routeNavigator: RouteNavigatorService
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next : (response) => {
        this.authService.saveUserData(response);
        this.routeNavigator.navigateToDashboard(); // Navega al dashboard
      },
      error: (error) => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }

  
  

  goToRegister(): void {
    this.routeNavigator.navigateToRegister(); // Navega al registro
  }
}