import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './auth.routes';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Requerido para Angular Material

import { AppComponent } from '../../app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild(authRoutes), // Importa las rutas locales
    FormsModule, // Agrega FormsModule aquí
  ],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}