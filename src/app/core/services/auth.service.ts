import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiry: string; // Fecha de expiración del refresh token
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7262/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(email: string, password: string): Observable<AuthResponse> {
    const loginData = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginData);
  }

   // Método para registrar un nuevo usuario
   register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiry');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token; // Retorna true si existe un token
  }

  // Guarda los tokens en el almacenamiento local
  saveUserData(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('refreshTokenExpiry', response.refreshTokenExpiry);
  }

  // Método para refrescar el token
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    const refreshTokenData = { refreshToken };
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, refreshTokenData);
  }

  // Método para verificar si el refresh token ha expirado
  isRefreshTokenExpired(): boolean {
    const expiryDate = localStorage.getItem('refreshTokenExpiry');
    if (!expiryDate) return true;

    const expiry = new Date(expiryDate);
    const now = new Date();
    return now > expiry; // Retorna true si el refresh token ha expirado
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente (por ejemplo, problemas de red)
      errorMessage = `Error de red: ${error.message}`;
    } else {
      // El backend no respondió o devolvió un código de error
      if (error.status === 0) {
        errorMessage = 'El servicio no está disponible. Por favor, inténtalo más tarde.';
      } else {
        errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}