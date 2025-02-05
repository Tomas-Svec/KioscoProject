import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root', // Asegúrate de que el servicio esté registrado en el root
})
export class AuthService {
  private apiUrl = 'https://localhost:7262/api/auth'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {} // Inyecta HttpClient aquí

  login(email: string, password: string): Observable<AuthResponse> {
    const loginData = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token; // Retorna true si existe un token
  }

  saveUserData(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    const refreshTokenData = { refreshToken };
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, refreshTokenData);
  }
}