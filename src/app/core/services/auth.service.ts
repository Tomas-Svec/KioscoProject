import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiry');
  }
}

  // Verifica si el usuario está autenticado
isAuthenticated(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('accessToken');
    return !!token; // Retorna true si existe un token
  }
  return false;
}

  // Guarda los tokens en el almacenamiento local
saveUserData(response: AuthResponse): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('refreshTokenExpiry', response.refreshTokenExpiry);
  }
}

  // Método para refrescar el token
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    const refreshTokenData = { refreshToken };
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, refreshTokenData);
  }

  // Método para verificar si el refresh token ha expirado
isRefreshTokenExpired(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    const expiryDate = localStorage.getItem('refreshTokenExpiry');
    if (!expiryDate) return true;
    const expiry = new Date(expiryDate);
    const now = new Date();
    return now > expiry; // Retorna true si el refresh token ha expirado
  }
  return true;
}

 
}