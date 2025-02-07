import { Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Requerido para Angular Material
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensajes al usuario

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(5000), // Timeout de 5 segundos
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente (por ejemplo, problemas de red)
          errorMessage = `Error de red: ${error.message}`;
        } else {
          // El backend no respondió o devolvió un código de error
          if (error.status === 0) {
            errorMessage =
              'El servicio no está disponible. Por favor, inténtalo más tarde.';
          } else {
            errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
          }
        }

        // Mostrar el mensaje de error al usuario
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000, // Duración del mensaje en milisegundos
          panelClass: ['error-snackbar'], // Clase CSS personalizada
        });

        // Lanzar el error para que pueda ser manejado por otros componentes si es necesario
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}