import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
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
  private currentUser: any | null = null;
  

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData).pipe(
      tap((response) => {
        this.saveUserData(response); // Llama internamente a saveUserData
      }),
      catchError(this.handleError)
    );
  }


// Método para cargar el perfil del usuario
loadCurrentUser(): void {
  if (isPlatformBrowser(this.platformId)) {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.http.get<any>(`${this.apiUrl}/auth/profile`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      }).subscribe(
        (user) => {
          this.currentUser = user; // Actualiza currentUser
          console.log('Usuario cargado:', user);
        },
        (error) => {
          console.error('Error al cargar el perfil del usuario:', error);
        }
      );
    }
  }
}

// Método para obtener el usuario actual
getCurrentUser(): any {
  return this.currentUser;
}

   // Método para registrar un nuevo usuario
  register(nombre: string, apellido: string, email: string, password: string, rol: string): Observable<any> {
    const userData = { nombre, apellido, email, password, rol };
    return this.http.post(`${this.apiUrl}/auth/register`, userData).pipe(
      catchError(this.handleError)
    );
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
  public saveUserData(response: any): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('refreshTokenExpiry', response.refreshTokenExpiry.toString());
  }

  // Método para refrescar el token
refreshToken(): Observable<any> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No se encontró el refresh token.');
  }
  return this.http.post<any>(`${this.apiUrl}/auth/refresh-token`, { refreshToken }).pipe(
    tap((response) => {
      this.saveUserData(response);
    }),
    catchError(this.handleError)
  );
}

// Middleware para manejar tokens expirados
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.getAccessToken();
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next.handle(request).pipe(
    catchError((error) => {
      if (error.status === 401) { // Token expirado
        return this.refreshToken().pipe(
          switchMap(() => next.handle(request))
        );
      }
      throw error;
    })
  );
}
  

  // Método para verificar si el refresh token ha expirado
  isRefreshTokenExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const expiryString = localStorage.getItem('refreshTokenExpiry');
      if (!expiryString) return true;
      const expiry = new Date(expiryString);
      const now = new Date();
      return now > expiry;
    }
    return true;
  }

  

  // Obtener el token de acceso
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la petición HTTP'));
  }


 
}